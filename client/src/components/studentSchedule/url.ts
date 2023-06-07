import { Participant } from "@turbo-schedule/common";

import { history } from "../../utils/history";
import { ScheduleDay } from "../../utils/selectSchedule";

export type StudentScheduleParams = {
	participant: Participant["text"];
	day: ScheduleDay | undefined;
	time: number | undefined;
	snapshot: string | undefined;
};

export const encodeDay = (day: ScheduleDay | undefined): string | "*" => (!day && day !== 0) ? "" : (day === "*" ? "*" : (Number(day) + 1).toString());
export const decodeDay = (day: string | number | "*" | null): ScheduleDay => (!day && day !== 0) ? 0 : (day === "*" ? "*" : ((Number(day) - 1) as ScheduleDay));

export const encodeTime = (time: number | undefined): string => (!time && time !== 0) ? "" : (time + 1).toString();
export const decodeTime = (time: number | string | null): number | undefined => (!time && time !== 0) ? undefined : Number(time) - 1;

export function parseStudentScheduleParams(participant: string): StudentScheduleParams {
	const search = new URLSearchParams(history.location.search);

	const day = decodeDay(search.get("day"));
	const time = decodeTime(search.get("time"));
	const snapshot = search.get("snapshot") || undefined;

	const parsed = {
		participant,
		day,
		time,
		snapshot,
	};

	return parsed;
}

// function parseMaybeNum(maybeNum: string | undefined | null): number | undefined {
// 	if (!maybeNum) {
// 		return undefined;
// 	}

// 	const num: number | undefined = Number(maybeNum);

// 	if (Number.isNaN(num)) {
// 		return undefined;
// 	}

// 	return num;
// };

export const syncStudentScheduleStateToURL = (
	params: StudentScheduleParams,
	opts: {
		replaceInsteadOfPush?: boolean /** should be used on the initial page load */;
	} = {}
): void => {
	const path: string | undefined = generateURLForStudentScheduleState(params);

	console.log("path", `"${path}"`);

	if (!path) {
		return;
	}

	if (opts.replaceInsteadOfPush) {
		history.replace(path);
		return;
	}

	history.push(path);
};

export function generateURLForStudentScheduleState({
	participant,
	day,
	time,
	snapshot,
}: StudentScheduleParams): string | undefined {
	if (!participant?.trim()) {
		return undefined;
	}

	const base = `/${participant}`;

	const search = new URLSearchParams(removeFalsyProperties({
		day: encodeDay(day),
		time: encodeTime(time),
		snapshot: snapshot || "",
	}));

	const URL = base + (search ? `?${search}` : "");

	console.log({ base, search, URL });

	return URL;
};

export function removeFalsyProperties(obj: {}): typeof obj {
	return Object.fromEntries(Object.entries(obj).filter(([_, val]) => !!val));
}
