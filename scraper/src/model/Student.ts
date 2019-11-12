import { IStudent, Student } from "@turbo-schedule/common";

import { hrefToFullURI } from "../util/hrefToFullURI";

export { IStudent, Student };

export const extractStudent = (rawStudentHtml: CheerioElement, baseScheduleURI: string): Student => {
	const { attribs, children } = rawStudentHtml;

	const studentData: Student = new Student({
		href: attribs.href,
		baseScheduleURI: baseScheduleURI,
		fullScheduleURI: hrefToFullURI(attribs.href, baseScheduleURI),
		text: children[0].data || "",
		lessons: [],
	});

	return studentData;
};
