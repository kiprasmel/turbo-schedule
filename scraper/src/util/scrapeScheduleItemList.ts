/* eslint-disable @typescript-eslint/no-use-before-define */
import cheerio from "cheerio";

import { Scrapable, createClass, StudentFromList, createTeacher, createRoom } from "@turbo-schedule/common";

import { findElementIndex } from "./findElementIndex";

export const scrapeClassList = scrapeScheduleItemListFactory("Klasės", "Mokytojai", createClass);
export const scrapeTeacherList = scrapeScheduleItemListFactory("Mokytojai", "Kabinetai", createTeacher);
export const scrapeRoomList = scrapeScheduleItemListFactory("Kabinetai", "Moksleiviai", createRoom);
export const scrapeStudentList = scrapeScheduleItemListFactory(
	"Moksleiviai",
	undefined,
	(ctx) => new StudentFromList({ text: ctx.text, originalHref: ctx.originalHref })
);

export function scrapeScheduleItemListFactory<Item>(
	scheduleItemStartIdentifier: string | undefined,
	scheduleItemEndIdentifier: string | undefined,
	createItem: <Ctx extends Scrapable>(context: Ctx) => Item
) {
	return (html: string): Item[] => {
		const $ = cheerio.load(html);

		/** first is useless and so is the last one, we take the middle table */
		const tableWithScheduleItems = $("table")[1];

		const tableDescriptionArray = $("tr td", tableWithScheduleItems).toArray();

		/**
		 * it can be `undefined` if the `starting` index cannot be determined
		 * & it just starts right from the start
		 */
		const scheduleItemStartIndex: number | undefined = scheduleItemStartIdentifier
			? findElementIndex(tableDescriptionArray, scheduleItemStartIdentifier)
			: undefined;

		/**
		 * it can be `undefined` if the `ending` index cannot be determined
		 * & it just goes all the way to the end
		 */
		const scheduleItemEndIndex: number | undefined = scheduleItemEndIdentifier
			? findElementIndex(tableDescriptionArray, scheduleItemEndIdentifier)
			: undefined;

		console.log("scheduleItemStartIndex", scheduleItemStartIndex, "scheduleItemEndIndex", scheduleItemEndIndex);

		/** take only the selected items */
		const selectedTds = tableDescriptionArray.slice(scheduleItemStartIndex, scheduleItemEndIndex);

		const scheduleItems = $("font a", selectedTds).toArray();

		const dataArray: Item[] = scheduleItems.map(
			({ attribs, children }: CheerioElement): Item =>
				createItem({ originalHref: attribs.href, text: children[0].data || "" })
		);

		return dataArray;
	};
}
