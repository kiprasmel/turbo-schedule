const removeNewline = (content: string) => {
	return content.replace("\n", "");
};

const createLessonId = (dayIndex: number, timeIndex: number, lessonName: string | null): string => {
	return `day:${dayIndex}/time:${timeIndex}/name:${lessonName}`;
};

export const extractLesson = (scheduleItem: CheerioElement, dayIndex: number, timeIndex: number) => {
	/** the schedule item was useless and was deleted, so skip it */
	if (!scheduleItem) {
		return null;
	}

	// const idBase: string = `day-${dayIndex}/time-${timeIndex}`;

	// console.log("scheduleItem", scheduleItem.children[0].children);

	// const lessonItem = scheduleItem.children[0].children[0]; //.children[0];
	// const lessonItem = scheduleItem.children[0].children[0].children[0].data;

	const itemWithClassNameTeacherAndRoom = scheduleItem.children[0] /** always skip this */.children;

	/** */

	const unsafeLessonName = itemWithClassNameTeacherAndRoom[0].children;
	/** skip `[1]` */
	const unsafeTeacherName = itemWithClassNameTeacherAndRoom[2];
	/** skip `[3]` */
	const unsafeRoomName = itemWithClassNameTeacherAndRoom[4];

	if (!unsafeLessonName || !unsafeTeacherName || !unsafeRoomName) {
		let lesson = {
			isEmpty: true,
			dayIndex: dayIndex,
			timeIndex: timeIndex,
			id: "",
			name: null,
			teacher: null,
			room: null,
		};

		lesson.id = createLessonId(lesson.dayIndex, lesson.timeIndex, lesson.name);

		// console.log("\nlesson", lesson);

		return lesson;
	}

	/** */

	const lessonName = unsafeLessonName[0].data || "";

	const teacherName = unsafeTeacherName.data || "";

	const roomName = unsafeRoomName.data || "";

	/** */

	let lesson = {
		isEmpty: false,
		dayIndex: dayIndex,
		timeIndex: timeIndex,
		id: "",
		name: removeNewline(lessonName),
		teacher: removeNewline(teacherName),
		room: removeNewline(roomName),
	};

	lesson.id = createLessonId(lesson.dayIndex, lesson.timeIndex, lesson.name);

	// Object.keys(lesson).map((key) => (lesson[key] = removeNewline(lesson[key])));

	// console.log("\nlesson", lesson);

	return lesson;
};

export const extractLessonsArray = (scheduleItemsArray: Array<CheerioElement>) => {
	// scheduleItemsArray = scheduleItemsArray.splice(0, 15);
	// const lessonsArray: Array<any> = scheduleItemsArray.map((scheduleItem, index) => extractLesson(scheduleItem, index));

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

	const extractedLessonsArray: Array<any> = [];

	/** go NOT from left to right & down, but from TOP to bottom & left */
	for (let workDay = 0; workDay < howManyWorkdays; ++workDay) {
		for (let lessonTime = 0; lessonTime < howManyLessonsMax; ++lessonTime) {
			const lessonIndex = workDay + lessonTime * howManyWorkdays;

			const extractedLesson = extractLesson(scheduleItemsArray[lessonIndex], workDay, lessonTime);

			extractedLessonsArray.push(extractedLesson);
		}
	}

	return extractedLessonsArray;
};
