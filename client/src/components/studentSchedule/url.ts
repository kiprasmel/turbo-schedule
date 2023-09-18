import { Participant } from "@turbo-schedule/common";

import { history } from "../../utils/history";
import { ScheduleDay, getTodaysScheduleDay } from "../../utils/selectSchedule";
import { parseSelectedSchoolFromURL } from "../../hooks/useSelectedSchool";

export type StudentScheduleParams = {
	school: string;
	participant: Participant["text"];
	day: ScheduleDay | undefined;
	time: number | undefined;
	snapshot: string | undefined;
};

export const encodeDay = (day: ScheduleDay | undefined): string | "*" => (!day && day !== 0) ? "" : (day === "*" ? "*" : (Number(day) + 1).toString());
export const decodeDay = (day: string | number | "*" | null): ScheduleDay => (!day && day !== 0) ? 0 : (day === "*" ? "*" : ((Number(day) - 1) as ScheduleDay));

export const encodeTime = (time: number | undefined): string => (!time && time !== 0) ? "" : (time + 1).toString();
export const decodeTime = (time: number | string | null): number | undefined => (!time && time !== 0) ? undefined : Number(time) - 1;

/**
 * TODO: shouldn't we take the `school` and `participant` from the URL too?
 */
// export function parseStudentScheduleParams(school: string, participant: string): StudentScheduleParams {
export function parseStudentScheduleParams(participant: string): StudentScheduleParams {
	const school: string | null = parseSelectedSchoolFromURL(history.location)
	if (!school) {
		const msg = `expected history.location.pathname to include the school's ID, but alas`
		throw new Error(msg)
	}

	const search = new URLSearchParams(history.location.search);

	const day = decodeDay(search.get("day")) || getTodaysScheduleDay();
	const time = decodeTime(search.get("time"));
	const snapshot = search.get("snapshot") || undefined;

	const parsed: StudentScheduleParams = {
		school,
		participant,
		day,
		time,
		snapshot,
	};

	return parsed;
}

// function parseMaybeNum(maybeNum: string | undefined | null): number | undefined {
// 	if (!maybeNum) {
// 		return undefined;
// 	}

// 	const num: number | undefined = Number(maybeNum);

// 	if (Number.isNaN(num)) {
// 		return undefined;
// 	}

// 	return num;
// };

export const syncStudentScheduleStateToURL = (
	params: StudentScheduleParams,
	opts: {
		replaceInsteadOfPush?: boolean /** should be used on the initial page load */;
	} = {}
): void => {
	const path: string | undefined = generateURLForStudentScheduleState(params);

	if (!path) {
		return;
	}

	if (opts.replaceInsteadOfPush) {
		history.replace(path);
		return;
	}

	history.push(path);
};

export function generateURLForStudentScheduleState({
	school,
	participant,
	day,
	time,
	snapshot,
}: StudentScheduleParams): string | undefined {
	if (!participant?.trim()) {
		return undefined;
	}

	const base = `/${school}/${participant}`;

	const searchProps = {
		snapshot: snapshot || "",
		day: encodeDay(day),
		time: encodeTime(time),
	};
	const search: string = new URLSearchParams(removeFalsyProperties(searchProps)).toString();

	const URL = base + (search ? `?${search}` : "");

	return URL;
};

export function removeFalsyProperties(obj: {}): typeof obj {
	return Object.fromEntries(Object.entries(obj).filter(([_, val]) => !!val));
}
