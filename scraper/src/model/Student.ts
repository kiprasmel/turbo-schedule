import { hrefToFullURI } from "../util/hrefToFullURI";

export interface IStudent {
	href: string /** TODO better name */;
	baseScheduleURI: string;
	fullScheduleURI: string;
	text: string;
}

export const extractStudent = (rawStudentHtml: CheerioElement, baseScheduleURI: string): IStudent => {
	const { attribs, children } = rawStudentHtml;

	const studentData: IStudent = {
		href: attribs.href,
		baseScheduleURI: baseScheduleURI,
		fullScheduleURI: hrefToFullURI(attribs.href, baseScheduleURI),
		text: children[0].data || "",
	};

	return studentData;
};
