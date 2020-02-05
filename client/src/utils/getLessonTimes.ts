import moment from "moment";

/** TODO CONFIG or API & scraper */
const lessonStartTimes: Array<string> = [
	"08:00",
	"08:55",
	"9:55",
	"10:55",
	"12:10",
	"13:10",
	"14:10",
	"15:05",
	"16:00",
];

const lessonEndTimes: Array<string> = ["08:45", "09:40", "10:40", "11:40", "12:55", "13:55", "14:55", "15:50", "16:45"];

export const getLessonStartOrEndTime = (timeIndex: number, startOrEnd: "start" | "end"): string =>
	startOrEnd === "start" ? lessonStartTimes[timeIndex] : lessonEndTimes[timeIndex];

export interface ILessonTimes {
	startTime: string;
	endTime: string;
}

export const getLessonTimes = (timeIndex: number): ILessonTimes => {
	const startTime: string = getLessonStartOrEndTime(timeIndex, "start");
	const endTime: string = getLessonStartOrEndTime(timeIndex, "end");

	const lessonTimes: ILessonTimes = { startTime, endTime };

	return lessonTimes;
};

export const getLessonTimesFormatted = (timeIndex: number, separator: string = " - "): string => {
	const { startTime, endTime } = getLessonTimes(timeIndex);

	return startTime + separator + endTime;
};

export interface IIsLessonHappeningNow {
	isHappeningNow: boolean;
	howMuchDone: number /** between 0 and 1; `-1` if not started */;
}
export const isLessonHappeningNow = (dayIndex: number, timeIndex: number): IIsLessonHappeningNow => {
	const todaysWeekday: number = new Date().getDay();

	if (dayIndex !== todaysWeekday - 1) {
		return { isHappeningNow: false, howMuchDone: -1 };
	}

	const now: Date = new Date();

	const { startTime, endTime } = getLessonTimes(timeIndex);

	const start = moment(startTime, "hh:mm");
	const end = moment(endTime, "hh:mm");

	const isHappeningNow: boolean = moment(now).isBetween(start, end, "minute");

	if (!isHappeningNow) {
		return { isHappeningNow: false, howMuchDone: -1 };
	}

	const diffFromStartAndEnd: number = moment(end).diff(start, "seconds");
	const diffFromEndToNow: number = moment(end).diff(now, "seconds");

	const howMuchDone: number = diffFromEndToNow / diffFromStartAndEnd;

	return { isHappeningNow: true, howMuchDone };
};
