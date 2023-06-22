import { ScheduleDay } from "../../utils/selectSchedule";

export const dayIndexPretty = (dayIndex: ScheduleDay): string => dayIndex === "*" ? "*" : (dayIndex + 1).toString();
export const dayIndexPrettyRoman = (dayIndex: ScheduleDay): string => dayIndex === "*" ? "*" : arabitToRoman[dayIndex + 1];

const arabitToRoman = {
	1: "I",
	2: "II",
	3: "III",
	4: "IV",
	5: "V",
	// shouldn't be needed, but anyway
	6: "VI",
	7: "VII",
} as const;
