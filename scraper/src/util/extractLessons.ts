import { NonUniqueLesson, getHtml, Lesson } from "@turbo-schedule/common";
import { prepareScheduleItems } from "./prepareScheduleItems";

const removeNewlineAndTrim = (content: string) => content.replace("\n", "").trim();

const extractLesson = (
	scheduleItem: CheerioElement,
	dayIndex: number,
	timeIndex: number
): NonUniqueLesson | undefined => {
	/** the schedule item was useless and was deleted, so skip it */
	if (!scheduleItem) {
		return undefined;
	}

	const itemWithClassNameTeacherAndRoom = scheduleItem.children[0] /** always skip this */.children;

	const unsafeLessonName = itemWithClassNameTeacherAndRoom[0].children;
	/** skip `[1]` */
	const unsafeTeacherName = itemWithClassNameTeacherAndRoom[2];
	/** skip `[3]` */
	const unsafeRoomName = itemWithClassNameTeacherAndRoom[4];

	if (!unsafeLessonName || !unsafeTeacherName || !unsafeRoomName) {
		/**
		 * TODO - still provide the values even if more than 0 of them
		 * are falsy.
		 *
		 * TS says they're `CheerioElement[]`, and I don't remember
		 * if it's possible for them to become falsy.
		 */
		const lesson: NonUniqueLesson = new NonUniqueLesson({
			isEmpty: true,
			dayIndex,
			timeIndex,
		});

		return lesson;
	}

	/** */

	const lessonName = unsafeLessonName[0].data || "";

	const teacherName = unsafeTeacherName.data || "";

	const roomName = unsafeRoomName.data || "";

	/** */

	const lesson: NonUniqueLesson = new NonUniqueLesson({
		isEmpty: false,
		dayIndex,
		timeIndex,
		name: removeNewlineAndTrim(lessonName),
		teacher: removeNewlineAndTrim(teacherName),
		room: removeNewlineAndTrim(roomName),
	});

	// Object.keys(lesson).map((key) => (lesson[key] = removeNewlineAndTrim(lesson[key])));

	// console.log("\nlesson", lesson);

	return lesson;
};

export const extractLessons = async (originalScheduleURI: string, scheduleEntityID: string): Promise<Lesson[]> => {
	// scheduleItemsArray = scheduleItemsArray.splice(0, 15);
	// const lessonsArray: Array<any> = scheduleItemsArray.map((scheduleItem, index) => extractLesson(scheduleItem, index));

	const html: string = await getHtml(originalScheduleURI, "windows-1257");

	const scheduleItemsArray: CheerioElement[] = prepareScheduleItems(html);

	// const lessonTimesArray: Array<string> = [
	// 	"08:00",
	// 	"08:55",
	// 	"9:55",
	// 	"10:55",
	// 	"12:10",
	// 	"13:10",
	// 	"14:10",
	// 	"15:05",
	// 	"16:00",
	// ];

	// const workDaysArray: Array<string> = [
	// 	"Pirmadienis",
	// ]

	// const workDaysArray: Array<number> = [0, 1, 2, 3, 4];

	const howManyWorkdays: number = 5;
	const howManyLessonsMax: number = 9; /** todo automatic */

	const extractedLessonsArray: Array<Lesson> = [];

	/** go NOT from left to right & down, but from TOP to bottom & left */
	for (let workDay = 0; workDay < howManyWorkdays; ++workDay) {
		for (let lessonTime = 0; lessonTime < howManyLessonsMax; ++lessonTime) {
			const lessonIndex = workDay + lessonTime * howManyWorkdays;

			const extractedLesson: NonUniqueLesson | undefined = extractLesson(
				scheduleItemsArray[lessonIndex],
				workDay,
				lessonTime
			);

			if (!extractedLesson) {
				continue;
			}

			const lessonWithStudent: Lesson = {
				...extractedLesson,
				students: [scheduleEntityID],
			};

			extractedLessonsArray.push(lessonWithStudent);
		}
	}

	return extractedLessonsArray;
};
