// const extractTime = (currentRawScheduleItem: CheerioElement) => {
// 	const { children } = currentRawScheduleItem;
// 	return children[0] && children[0].children[2] && children[0].children[2].data;
// };

export const removeUselessTdsFromSchedule = (
	scheduleItemsReference: Array<CheerioElement>,
	tableColumnCount: number
): Array<CheerioElement> => {
	const scheduleItems: Array<CheerioElement> = [...scheduleItemsReference];

	const maxLessonCount: number = 9;

	const studentNameIndex = 0;

	const uselessIndexes = [1];

	const workdayIndexes = [2, 3, 4, 5, 6];

	const firstLessonTimeIndex: number = 7;
	const lessonTimeIndexes: Array<number> = [];

	for (let i = 0; i < maxLessonCount; ++i) {
		lessonTimeIndexes.push(firstLessonTimeIndex + i * tableColumnCount);
	}

	const indexesContainingNotLessons: Array<number> = [
		studentNameIndex,
		...uselessIndexes,
		...workdayIndexes,
		...lessonTimeIndexes,
	];

	// console.log("indexesContainingNotLessons", indexesContainingNotLessons);

	// console.log("data 2 be rm'ed", scheduleItems[13].children[0].children[2].data);

	// console.log(
	// 	"data to be removed",
	// 	indexesContainingNotLessons.map(
	// 		(index) => extractTime(scheduleItems[index]) || scheduleItems[index].children[0].children[0].data
	// 	)
	// );

	// for (let index of indexesContainingNotLessons) {
	// 	// delete scheduleItems[index];
	// 	scheduleItems.splice(index, 1);
	// }

	/** remove unwanted ones */
	const cleanedUpScheduleItems: Array<CheerioElement> = scheduleItems.filter(
		(_item, index) => !indexesContainingNotLessons.includes(index)
	);

	return cleanedUpScheduleItems;
};
