/* eslint-disable @typescript-eslint/consistent-type-assertions */

/**
 *
 * create a bunch of lessons:
 * 	each lessons has some participants, a name, it's either empty or not
 *
 * pass the lesson creation data into the magic scraper function
 * to generate the proper schedule
 * 	prereq: refactor the magic scraper function
 *
 * save the data (reuse everything from the scraper)
 *
 */

import {
	createLessonWithParticipants,
	Lesson,
	LessonInitData,
	NonUniqueLesson, //
	ParticipantInLesson,
	ParticipantLabel,
	makeLessonsUnique,
	Participant,
	pickNPseudoRandomly,
	pickSome,
} from "@turbo-schedule/common";

// eslint-disable-next-line import/no-cycle
import { writeRawDb } from "../../setDbState";
import { databaseFileName } from "../../config";

const createParticipantWithLabels = (labels: ParticipantLabel[]) => (name: string): ParticipantInLesson => ({
	text: name,
	isActive: true,
	labels: labels,
});

interface CreateFakeDataOpts {
	studentNames: string[];
	classNames: string[];
	lessonNames: string[];
	teacherNames: string[];
	roomNames: string[];

	minDayIndex: number;
	maxDayIndex: number;
	minTimeIndex: number;
	maxTimeIndex: number;
}

export const getDefaultFakeDataOpts = (): CreateFakeDataOpts => ({
	studentNames: ["Alice", "Bob", "Becky", "Brian", "Caithy", "Kipras"],
	classNames: ["8a", "8b", "8c", "8d", "XIVa", "XIVb"],
	lessonNames: ["Maths", "IT", "Biology", "Physics", "Chemistry", "Geography", "History"],
	teacherNames: ["John", "Kimberly", "Jeniffer", "David", "Michael", "Karen"],
	roomNames: [
		"310 for maths",
		"311 for IT",
		"110 for biology",
		"125 for physics",
		"169 for chemistry",
		"202 for geography",
		"256 for history",
		"408a",
		"408b",
	],

	minDayIndex: 0,
	maxDayIndex: 4,
	minTimeIndex: 0,
	maxTimeIndex: 8,
});

export const createFakeData = async (
	{
		snapshot = databaseFileName,
	}: { snapshot?: string } = {}
) => {
	const {
		studentNames,
		classNames,
		lessonNames,
		teacherNames,
		roomNames,

		minDayIndex,
		maxDayIndex,
		minTimeIndex,
		maxTimeIndex,
	}: CreateFakeDataOpts = getDefaultFakeDataOpts();

	const generateInitDataForLessons = (): LessonInitData[] => {
		const _initDataForLessons: LessonInitData[] = [];

		for (let day = minDayIndex; day <= maxDayIndex; day++) {
			for (let time = minTimeIndex; time <= maxTimeIndex; time++) {
				const pickedLessonNames: string[] = pickNPseudoRandomly(lessonNames.length)(lessonNames);

				let alreadyPickedStudentNames: string[] = [];
				let alreadyPickedClassNames: string[] = [];
				let alreadyPickedTeacherNames: string[] = [];
				let alreadyPickedRoomNames: string[] = [];

				let didIncludeAllParticipants: boolean = false;

				for (
					let lessonNameIdx = 0;
					lessonNameIdx < pickedLessonNames.length && !didIncludeAllParticipants;
					lessonNameIdx++
				) {
					let lessonName: string = pickedLessonNames[lessonNameIdx];

					if (!lessonName) {
						throw new Error(`lesson name undefined lul. idx ${lessonNameIdx}`);
					}

					// let pickedStudentNames: string[] = pickNPseudoRandomly(1)(studentNames, alreadyPickedStudentNames);
					let pickedStudentNames: string[] = pickSome(studentNames, {
						alreadyTakenArr: alreadyPickedStudentNames,
					});

					// let pickedStudentNames: string[] = pickNPseudoRandomly(1)(studentNames, alreadyPickedStudentNames);
					let pickedClassNames: string[] = pickSome(classNames, { alreadyTakenArr: alreadyPickedClassNames });

					// let pickedTeacherNames: string[] = pickNPseudoRandomly(1)(teacherNames, alreadyPickedTeacherNames);
					let pickedTeacherNames: string[] = pickSome(teacherNames, {
						alreadyTakenArr: alreadyPickedTeacherNames,
					});

					// let pickedRoomNames: string[] = pickNPseudoRandomly(1)(roomNames, alreadyPickedRoomNames);
					let pickedRoomNames: string[] = pickSome(roomNames, { alreadyTakenArr: alreadyPickedRoomNames });

					let isEmpty: boolean = false; // time >= Math.ceil(maxTimeIndex * 0.8) ? Math.random() <= 0.5 : Math.random() <= 0.1;

					if (
						[pickedStudentNames, pickedClassNames, pickedTeacherNames, pickedRoomNames].some(
							(arr) => arr.length === 0
						)
					) {
						/**
						 * cannot create a new configuration for a lesson
						 * since at least one of the groups are completely taken
						 *
						 * thus add every single participant from every group
						 * that has not been added yet and mark the lesson as empty
						 */

						lessonName = "";
						isEmpty = true;
						didIncludeAllParticipants = true;

						pickedStudentNames = studentNames.filter((name) => !alreadyPickedStudentNames.includes(name));
						pickedClassNames = classNames.filter((name) => !alreadyPickedClassNames.includes(name));
						pickedTeacherNames = teacherNames.filter((name) => !alreadyPickedTeacherNames.includes(name));
						pickedRoomNames = roomNames.filter((name) => !alreadyPickedRoomNames.includes(name));
					}

					const newEntry = {
						dayIndex: day,
						timeIndex: time,
						isEmpty: isEmpty,
						name: lessonName,
						participants: [
							...pickedStudentNames.map(createParticipantWithLabels(["student"])),
							...pickedClassNames.map(createParticipantWithLabels(["class", "student"])),
							...pickedTeacherNames.map(createParticipantWithLabels(["teacher"])),
							...pickedRoomNames.map(createParticipantWithLabels(["room"])),
						],
					};

					_initDataForLessons.push(newEntry);

					alreadyPickedStudentNames = [...alreadyPickedStudentNames, ...pickedStudentNames];
					alreadyPickedClassNames = [...alreadyPickedClassNames, ...pickedClassNames];
					alreadyPickedTeacherNames = [...alreadyPickedTeacherNames, ...pickedTeacherNames];
					alreadyPickedRoomNames = [...alreadyPickedRoomNames, ...pickedRoomNames];
				}

				/**
				 * TODO: refactor, since this is pretty much the same as above
				 */
				if (!didIncludeAllParticipants) {
					didIncludeAllParticipants = true;
					const isEmpty = true;

					const pickedStudentNames: string[] = studentNames.filter(
						(name) => !alreadyPickedStudentNames.includes(name)
					);
					const pickedClassNames: string[] = classNames.filter(
						(name) => !alreadyPickedClassNames.includes(name)
					);
					const pickedTeacherNames: string[] = teacherNames.filter(
						(name) => !alreadyPickedTeacherNames.includes(name)
					);
					const pickedRoomNames: string[] = roomNames.filter(
						(name) => !alreadyPickedRoomNames.includes(name)
					);

					const newEntry = {
						dayIndex: day,
						timeIndex: time,
						isEmpty: isEmpty,
						name: "-",
						participants: [
							...pickedTeacherNames.map(createParticipantWithLabels(["teacher"])),
							...pickedClassNames.map(createParticipantWithLabels(["class", "student"])),
							...pickedRoomNames.map(createParticipantWithLabels(["room"])),
							...pickedStudentNames.map(createParticipantWithLabels(["student"])),
						],
					};

					_initDataForLessons.push(newEntry);
				}
			}
		}

		return _initDataForLessons;
	};

	const initDataForLessons: LessonInitData[] = generateInitDataForLessons();

	const nonUniqueLessons: NonUniqueLesson[] = initDataForLessons.map((lessonInitData) =>
		createLessonWithParticipants(lessonInitData)
	);

	const lessons: Lesson[] = makeLessonsUnique(nonUniqueLessons);

	const toParticipant = (name: Participant["text"], labels: ParticipantLabel[]): Participant => ({
		text: name,
		labels: labels,
		originalHref: `ayyy_lmao_${name}.html`,
		originalScheduleURI: `http://kipras.org/fake-url/ayyy_lmao_${name}.html`,
	});

	await writeRawDb({
		isDataFake: true,
		lessons,
		participants: (<{ names: string[]; labels: ParticipantLabel[] }[]>[
			{ names: studentNames, labels: ["student"] },
			{ names: classNames, labels: ["class", "student"] },
			{ names: teacherNames, labels: ["teacher"] },
			{ names: roomNames, labels: ["room"] },
		]).flatMap(({ names, labels }) => names.map((name) => toParticipant(name, labels))),
	}, snapshot);
};
