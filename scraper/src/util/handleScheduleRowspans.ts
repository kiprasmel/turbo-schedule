// const extractLessonV2 = (currentRawScheduleItem: CheerioElement) => {
// 	const { children } = currentRawScheduleItem;

// 	const lesson: { [key: string]: string } = {
// 		className: (children[0] && children[0].children[0] && children[0].children[0].data) || "",
// 		/** [1] is `<br>` */
// 		teacherName: (children[0] && children[0].children[2] && children[0].children[2].data) || "",
// 		/** [3] is `<br>` */
// 		classRoom: children[0].children[0].children[0].data || "",

// 		// classRoom: (children[4] && children[4].data) || "",
// 	};

// 	Object.entries(lesson).forEach(([key, value]) => (lesson[key] = value.replace("\n", "")));

// 	return lesson;
// };

/**
 * a `td` can take up more than one place!
 *
 * we have to handle it, and it gets confusing
 * since we go not top to bottom, but left to right
 * (that's how the selection of elements works).
 *
 */
export const handleScheduleRowspans = (scheduleItemsReference: Array<CheerioElement>, tableColumnCount: number) => {
	const scheduleItems = [...scheduleItemsReference];
	// console.log("before length", scheduleItems.length);

	for (let index = 0; index < scheduleItems.length; ++index) {
		const current = scheduleItems[index];

		const rowspanAttr = (!!current.attribs.rowspan && Number(current.attribs.rowspan)) || null;

		if (rowspanAttr) {
			// console.log("rowspan!", rowspanAttr, "index", index);
		}

		if (!!rowspanAttr && rowspanAttr > 1) {
			/**
			 * -1, so if the value is more than `2`,
			 * we can safely handle it later,
			 * after handling the current row.
			 */
			const newRowspanAttr: string = (rowspanAttr - 1).toString();

			if (Number(newRowspanAttr) > 1) {
				current.attribs.rowspan = newRowspanAttr;
			} else delete current.attribs.rowspan;

			// console.log(
			// 	"new current",
			// 	current.attribs["rowspan"],
			// 	"lesson",
			// 	extractLessonV2(current),
			// 	"data"
			// 	// current.children[0].children[2]
			// 	// current.children[0].children[0].children[0].data // class
			// );

			const copyIndex = index + tableColumnCount;
			const deleteCount = 0;

			/** insert the same item right below it */
			scheduleItems.splice(copyIndex, deleteCount, { ...current });
		}
	}

	// console.log("after length", scheduleItems.length);

	return scheduleItems;
};
