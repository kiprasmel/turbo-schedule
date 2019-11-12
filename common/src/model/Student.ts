/** ported from `server` */
// import { hrefToFullURI } from "../util/hrefToFullURI";

/**
 * we always provide default values
 * with their correct types.
 */

/**
 * TODO - provide a class so you can init it with default values.
 */
export interface IStudent {
	/** TODO better name */
	href: string;
	baseScheduleURI: string;
	fullScheduleURI: string;
	text: string;
	lessons: any[];
	/**
	 * TODO - return by default when returning the array of students.
	 */
}

export class Student implements IStudent {
	href: string = "" /** TODO better name */;
	baseScheduleURI: string = "";
	fullScheduleURI: string = "";
	text: string = "";
	lessons: any[] = [];

	constructor(data?: IStudent) {
		Object.assign(this, data);
	}
}

// export const extractStudent = (rawStudentHtml: CheerioElement, baseScheduleURI: string): Student => {
// 	const { attribs, children } = rawStudentHtml;

// 	const studentData: Student = new Student({
// 		href: attribs.href,
// 		baseScheduleURI: baseScheduleURI,
// 		fullScheduleURI: hrefToFullURI(attribs.href, baseScheduleURI),
// 		text: children[0].data || "",
// 		lessons: [],
// 	});

// 	return studentData;
// };
