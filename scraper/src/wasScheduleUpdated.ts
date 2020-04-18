import { initDb, Db } from "@turbo-schedule/database";

import { getFrontPageHtml } from "./util/getFrontPageHtml";
import { createPageVersionIdentifier } from "./util/createPageVersionIdentifier";

export const wasScheduleUpdated = async (): Promise<boolean> => {
	const db: Db = await initDb();
	const { pageVersionIdentifier } = await db.get("scrapeInfo").value();

	const frontPageHtml: string = await getFrontPageHtml();
	const potentiallyUpdatedPageVersionIdentifier: string = createPageVersionIdentifier(frontPageHtml);

	const wasUpdated: boolean = pageVersionIdentifier !== potentiallyUpdatedPageVersionIdentifier;

	return wasUpdated;
};
