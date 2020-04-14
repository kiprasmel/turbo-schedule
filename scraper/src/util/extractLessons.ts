/* eslint-disable @typescript-eslint/no-use-before-define */
import { NonUniqueLesson, getHtml, Lesson } from "@turbo-schedule/common";
import { prepareScheduleItems } from "./prepareScheduleItems";

export const extractLessonFromStudent: LessonExtractor = extractLessonsFactory(extractLessonFromStudentParser);
export const extractLessonFromClass: LessonExtractor = extractLessonsFactory(extractLessonFromClassParser);

export type LessonExtractor = (
	originalScheduleURI: string, //
	scheduleEntityID: string
) => Promise<Lesson[]>;

function extractLessonsFactory(parser: LessonParser): LessonExtractor {
	return async (
		originalScheduleURI: string, //
		scheduleEntityID: string
	): Promise<Lesson[]> => {
		// scheduleItemsArray = scheduleItemsArray.splice(0, 15);
		// const lessonsArray: Array<any> = scheduleItemsArray.map((scheduleItem, index) => extractLesson(scheduleItem, index));

		const html: string = await getHtml(originalScheduleURI, "windows-1257");

		const scheduleItemsArray: CheerioElement[] = prepareScheduleItems(html);

		const howManyWorkdays: number = 5;
		const howManyLessonsMax: number = 9; /** todo automatic */

		let extractedLessonsArray: Array<Lesson> = [];

		/** go NOT from left to right & down, but from TOP to bottom & left */
		for (let workDay = 0; workDay < howManyWorkdays; ++workDay) {
			for (let lessonTime = 0; lessonTime < howManyLessonsMax; ++lessonTime) {
				const lessonIndex = workDay + lessonTime * howManyWorkdays;

				const currentLessonItem: CheerioElement | undefined = scheduleItemsArray[lessonIndex];

				if (!currentLessonItem) {
					/** the schedule item was useless and was deleted, so skip it */
					continue;
				}

				const extractedLessons: NonUniqueLesson[] = parser(
					scheduleItemsArray[lessonIndex],
					workDay,
					lessonTime
				);

				const extractedLessonsWithStudent: Lesson[] = extractedLessons.map((lesson) => ({
					...lesson,
					students: [scheduleEntityID],
				}));

				extractedLessonsArray = [...extractedLessonsArray, ...extractedLessonsWithStudent];
			}
		}

		return extractedLessonsArray;
	};
}

export type LessonParser = (
	scheduleItem: CheerioElement, //
	dayIndex: number,
	timeIndex: number
) => NonUniqueLesson[];

function extractLessonFromStudentParser(
	scheduleItem: CheerioElement, //
	dayIndex: number,
	timeIndex: number
): NonUniqueLesson[] {
	const itemWithClassNameTeacherAndRoom = scheduleItem.children[0] /** always skip this */.children;

	const name = removeNewlineAndTrim(itemWithClassNameTeacherAndRoom[0].children?.[0]?.data ?? "");
	const teacher = removeNewlineAndTrim(itemWithClassNameTeacherAndRoom[2]?.data ?? "");
	const room = removeNewlineAndTrim(itemWithClassNameTeacherAndRoom[4]?.data ?? "");

	const isEmpty: boolean = !name || !teacher || !room;

	const lesson: NonUniqueLesson = new NonUniqueLesson({
		isEmpty,
		dayIndex,
		timeIndex,
		name,
		teacher,
		room,
	});

	return [lesson];
}

function extractLessonFromClassParser(
	scheduleItem: CheerioElement, //
	dayIndex: number,
	timeIndex: number
): NonUniqueLesson[] {
	const itemWithClassNameTeacherAndRoom = scheduleItem.children[0] /** always skip this */.children;

	// console.log("item with stuff", JSON.stringify(itemWithClassNameTeacherAndRoom));

	const name: string = removeNewlineAndTrim(itemWithClassNameTeacherAndRoom[0].children?.[0]?.data ?? "");
	const room: string = removeNewlineAndTrim(itemWithClassNameTeacherAndRoom[6]?.data ?? "");
	const teacher: string = removeNewlineAndTrim(itemWithClassNameTeacherAndRoom[4]?.data ?? "");

	const isEmpty: boolean = !name || !teacher || !room;

	/**
	 * there's this thing where a class might contain multiple rooms & teachers
	 * all bunched up into a single lesson
	 *
	 * (see https://github.com/sarpik/turbo-schedule/issues/31#issuecomment-612715871)
	 *
	 * and we don't like that,
	 * so we'll split them into separate ones here, if needed!
	 *
	 */

	const hasMultipleTeachersOrRooms: boolean = teacher.split("\n").length > 1 || room.split("\n").length > 1;

	if (!hasMultipleTeachersOrRooms) {
		const lesson: NonUniqueLesson = new NonUniqueLesson({
			isEmpty,
			dayIndex,
			timeIndex,
			name,
			teacher,
			room,
		});

		return [lesson];
	}

	/**
	 * the lesson has multiple teachers or rooms. Good luck:D
	 */

	const teachers: string[] = teacher
		.split("\n")
		.map((t) => t.trim())
		.filter((t) => !!t);

	const rooms: string[] = room
		.split("\n")
		.map((r) => r.trim())
		.filter((r) => !!r);

	/**
	 * if this is deterministic & we can tell where which teacher & room belongs too
	 *
	 * oh wait there'll be more than 1 lesson wiht the same day & time index --
	 * which one should we show in the schedule?
	 *
	 * Determinism out the window, rip...
	 */
	/** TODO BEGIN good */
	// if (teachers.length === rooms.length || teachers.length === 1 || rooms.length === 1) {
	// 	const lessons: NonUniqueLesson[] = [];

	// 	for (let i = 0; i < Math.max(teachers.length, rooms.length); ++i) {
	// 		const currentLesson: NonUniqueLesson = new NonUniqueLesson({
	// 			isEmpty,
	// 			dayIndex,
	// 			timeIndex,
	// 			name,
	// 			teacher: teachers.length === 1 ? teachers[0] : teachers[i],
	// 			room: rooms.length === 1 ? rooms[0] : rooms[i],
	// 		});

	// 		lessons.push(currentLesson);
	// 	}

	// 	return lessons;
	// }
	/** TODO END good */

	/**
	 * otherwise - it's not deterministic
	 */
	// eslint-disable-next-line no-else-return
	/** TODO BEGIN good */
	// else {
	/** TODO END good */
	/** TODO BEGIN good */
	// console.error("Teachers & rooms length was different! teachers:", teachers, "rooms:", rooms);
	// throw new Error("Teachers & rooms length was different!");
	/** TODO END good */

	const lesson: NonUniqueLesson = new NonUniqueLesson({
		isEmpty,
		dayIndex,
		timeIndex,
		name,
		/** BEGIN HACK */
		teacher: teachers.join(", ").trim(),
		room: rooms.join(", ").trim(),
		/** END HACK */
	});

	return [lesson];

	/**     teacher": ".* .*?,.*"    */
	/** TODO BEGIN good */
	// }
	/** TODO END good */
}

const removeNewlineAndTrim = (content: string) => content.replace("\n", "").trim();
