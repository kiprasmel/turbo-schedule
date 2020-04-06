#!/usr/bin/env ts-node-dev
// rectifier.ts

import _debug from "debug";
import fs from "fs-extra";
import cheerio from "cheerio";
import prettier from "prettier";

import { getHtml, Lesson, Change } from "@turbo-schedule/common";
import { Db, initDb } from "@turbo-schedule/database";

import { findTimeIndexes } from "./findTimeIndexes";

const debug = _debug("rectifier");

/**
 *
 */
const rectifier = async (): Promise<void> => {
	const url: string = encodeURI("http://kpg.lt/pamokų-pakeitimai/");
	const htmlRaw: string = await getHtml(url);

	/**
	 * remove `&nbsp;` etc.
	 */
	const html: string = htmlRaw.replace(/\u00A0/g, " ");

	await fs.writeFile("lesson-changes.html", html, { encoding: "utf-8" });

	const $ = await cheerio.load(html, { normalizeWhitespace: true });

	const fiveWeekDays: CheerioElement[] = [];
	const changesOfTheFiveDays: CheerioElement[] = $(".umb-grid").toArray();

	const containerItems: Cheerio = $(".container");
	for (let i = 3; i < 13; i += 2) {
		fiveWeekDays.push(containerItems[i]);
	}

	/** BEGIN external */

	const db: Db = await initDb();
	let lessons: Lesson[] = await db.get("lessons").value();

	lessons = lessons.map((lesson) => {
		const { teacher } = lesson;

		if (!teacher) {
			return lesson;
		}

		const [lastName, firstName]: string[] = teacher.split(" ");
		const shortenedTeacherName: string = firstName.slice(0, 1) + ". " + lastName;

		return { ...lesson, teacher: shortenedTeacherName };
	});

	const knownTrashRegexes: RegExp[] = [/mokslo metų prioritetas/g];
	const isTrash = (str: string): boolean => {
		const ret: boolean = !!knownTrashRegexes.filter((regex) => regex.test(str)).length;
		knownTrashRegexes.map((regex) => (regex.lastIndex = 0)); /** https://stackoverflow.com/a/8911576/9285308 */
		return ret;
	};

	const teachers: string[] = lessons.map((lesson) => lesson.teacher);
	const isTeacherRegex: RegExp = /^[\wąčęėįšųūž]\. [\wąčęėįšųūž]+/gi; /** TODO REMOVE once we have all teachers */
	const isTeacher = (str: string): boolean => {
		const ret: boolean = teachers.includes(str) || isTeacherRegex.test(str);
		isTeacherRegex.lastIndex = 0; /** https://stackoverflow.com/a/8911576/9285308 */
		return ret;
	};

	const classes: string[] = []; /** TODO */
	const isClassRegex: RegExp = /^(\d\w|(I{1,3}|IV)G?\w)$/gi;
	const isClass = (str: string): boolean => {
		const ret: boolean = classes.includes(str) || isClassRegex.test(str);
		isClassRegex.lastIndex = 0; /** https://stackoverflow.com/a/8911576/9285308 */
		return ret;
	};

	const changeRegexes = [
		/^\d pam\./, //
		/^\d-\d pam\./,
		/^\d\w.+/,
		/savarankiškas darbas/,
		/^pavaduoja/,
	];
	const isChange = (str: string): boolean => {
		for (const regex of changeRegexes) {
			const result = regex.test(str);

			regex.lastIndex = 0; /** https://stackoverflow.com/a/8911576/9285308 */

			if (result) {
				return true;
			}
		}

		return false;
	};

	/**
	 * if text is in "top level", it meants that it can have changes related to it,
	 * and it becomes their parent.
	 *
	 * `isTrash` shouldn't give any effect, since we remove trash beforehand.
	 *
	 */
	const isTopLevel = (str: string): boolean => isTeacher(str) || isClass(str) || isTrash(str);

	/** END external */

	let parsedChanges: Change[] = [];

	for (let i = 0; i < 5; ++i) {
		const currDay = $(fiveWeekDays[i])
			.text()
			.trim()
			.split("\n")[1]
			.trim();

		const days: string[] = ["Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis"];

		let dayIndex: number = -1;

		for (let d = 0; d < 5; ++d) {
			const suspectDay = days[d];

			if (currDay.includes(suspectDay)) {
				dayIndex = d;
			}
		}

		let currChanges = $(changesOfTheFiveDays[i])
			.text()
			.replace(/\n+\s+/g, "\n")
			.split("\n")
			.map((value) => value.trim().replace(/\s+/g, " "))
			.filter((value) => !!value);

		/** remove trash */
		currChanges = currChanges.filter((change) => !isTrash(change));

		/** do the good stuff */
		let parent: string = "";

		for (let c = 0; c < currChanges.length; ++c) {
			const currChange: string = currChanges[c];

			debug(
				"currChange %o, isTopLevel %o, isChange %o",
				currChange,
				isTopLevel(currChange),
				isChange(currChange)
			);

			/**
			 * if a parent has 0 descendants, it just gets ignored,
			 * since another parent shows up & overrides it.
			 */
			if (isTopLevel(currChange)) {
				parent = currChange;
				continue;
			}

			/** the change is a descendant of the current parent */
			const newParsedChange: Change = {
				dayIndex: dayIndex,
				timeIndex: -1 /** gets handled just below, or stays at `-1` to indicate an invalid time */,
				parent: parent,
				text: currChange,
				isUnknown: !isChange(currChange),
			};

			const timeIndexes: number[] = findTimeIndexes({ change: newParsedChange, lessons: lessons });

			const newParsedChanges: Change[] = [];

			for (const timeIndex of timeIndexes) {
				newParsedChanges.push({ ...newParsedChange, timeIndex: timeIndex });
			}

			debug("newParsedChanges %o", newParsedChanges);

			parsedChanges = [...parsedChanges, ...newParsedChanges];
		}
	}

	await fs.writeFile(
		"changes-parsed.json",
		prettier.format(JSON.stringify(parsedChanges), { parser: "json-stringify" })
	);

	await db.set("changes", parsedChanges).write();
};

rectifier();
