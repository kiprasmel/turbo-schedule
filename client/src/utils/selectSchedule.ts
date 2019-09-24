import { ILesson } from "../models/Lesson";
import { getWeekdayIndex, IWeekdayIndex } from "./getWeekday";

// export interface IScheduleDay {
// 	key: number | string;
// 	value: number | string;
// }

// export const scheduleDays: Array<IScheduleDay> = [
// 	{ key: "week", value: "Savaitė" },
// 	{ key: 1, value: 1 },
// 	{ key: 2, value: 2 },
// 	{ key: 3, value: 3 },
// 	{ key: 4, value: 4 },
// 	{ key: 5, value: 5 },
// ];

export interface IScheduleDays {
	Week: string;
	0: number;
	1: number;
	2: number;
	3: number;
	4: number;
}

export type ScheduleDay = keyof IScheduleDays;

export type ScheduleDayKind = IScheduleDays[keyof IScheduleDays];

/** TODO i18n w/ react-i18next */
// export const scheduleDaysByLang: { [key: string]: Array<ScheduleDayKind> } = {
// 	lt: ["Savaitė", 1, 2, 3, 4, 5],
// 	en: ["Week", 1, 2, 3, 4, 5],
// };

export const scheduleDaysArray: Array<ScheduleDay> = ["Week", 0, 1, 2, 3, 4];

export const selectSchedule = (scheduleByDays: Array<Array<ILesson>>, day: ScheduleDay) => {
	if (day === "Week") {
		return scheduleByDays;
	}

	return scheduleByDays[day];
};

export interface IGetTodaysScheduleDayOptions {
	defaultToDay?: ScheduleDay;
}

export const getTodaysScheduleDay = (options: IGetTodaysScheduleDayOptions = { defaultToDay: 0 }): ScheduleDay => {
	const todaysWeekdayIndex: IWeekdayIndex = getWeekdayIndex();

	/**
	 * This should be type-checked automatically by typescript,
	 * but currently is not...
	 *
	 */
	const todaysScheduleDay: ScheduleDay = (todaysWeekdayIndex > 4
		? options.defaultToDay
		: todaysWeekdayIndex) as ScheduleDay;

	return todaysScheduleDay;
};

// export const useScheduleDay = () => {
// 	const todaysScheduleDay: ScheduleDay = getTodaysScheduleDay({ defaultToDay: 0 });

// 	const [selectedDay, setSelectedDay] = useState<ScheduleDay>(todaysScheduleDay);

// 	return [selectedDay, setSelectedDay];
// };
