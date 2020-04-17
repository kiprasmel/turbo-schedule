import { getHtml, frontPageScheduleURI } from "@turbo-schedule/common";

// eslint-disable-next-line no-return-await
export const getFrontPageHtml = async (): Promise<string> => await getHtml(frontPageScheduleURI, "windows-1257");
