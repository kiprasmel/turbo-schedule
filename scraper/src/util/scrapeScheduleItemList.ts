/* eslint-disable @typescript-eslint/no-use-before-define */
import cheerio from "cheerio";

import { Participant, ParticipantLabel } from "@turbo-schedule/common";

import { Initializer } from "../initializer/Initializer";
import { findElementIndex } from "./findElementIndex";

export function scrapeScheduleItemListFactory<T extends Participant>(
	scheduleItemStartIdentifier: string | undefined,
	scheduleItemEndIdentifier: string | undefined,
	labels: ParticipantLabel[],
	createItem: Initializer<T>
) {
	return (html: string): T[] => {
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

		const dataArray: T[] = scheduleItems.map(
			({ attribs, children }: CheerioElement): T =>
				createItem({ originalHref: attribs.href, text: children[0].data || "", labels })
		);

		return dataArray;
	};
}
