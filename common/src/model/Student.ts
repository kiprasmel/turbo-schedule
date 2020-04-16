/* eslint-disable max-classes-per-file */
/* eslint-disable lines-between-class-members */
/**
 * NOTE - the dynamic imports inside functions:
 *
 * See https://github.com/jprichardson/node-fs-extra/issues/743
 * and https://stackoverflow.com/a/43112861/9285308
 *
 * Use
 *
 * ```ts
 * const fs = await import("fs-extra");
 * ```
 *
 * to dynamically load `fs` so that it's not loaded in the browser.
 *
 */

// import { IScraperConfig } from "@turbo-schedule/scraper";

/* eslint-disable import/no-cycle */
import { Lesson, NonUniqueLesson } from "./Lesson";
import { getSpecificScheduleURI } from "./Schedule";
// import { Friend } from "./Friend";

/**
 * `get`ters don't work well
 * because they aren't included in the JSON.stringify serialization,
 * meaning that the values aren't saved.
 *
 * This might be a great storage space improvement later on,
 * but currently it just seems a little too complicated.
 *
 * + this optimization is questionable,
 * since we'd then need to create instances of students
 * when a query happens to get all the required fields,
 * then probably cache the result,
 * which results in the whole thing becoming pointless.
 */

import { TClassNum, classNumMin, classNumMax } from "./Class";

/**
 * only `originalHref` & `text` are mandatory;
 * everything else gets created from them,
 * thus optional.
 */
export interface StudentFromListInitData extends Partial<StudentFromList> {
	originalHref: string;
	text: string;
}

export class StudentFromList {
	readonly id: string;

	readonly text: string;
	readonly originalHref: string;

	readonly originalScheduleURI: string;

	readonly firstName: string;
	readonly lastName: string;
	readonly fullName: string;

	/** BEGIN Class */
	readonly classNum: TClassNum;
	readonly classChar: string;
	readonly fullClass: string; /** TODO `className` */

	readonly classNumOrig: string;
	readonly classCharOrig: string;
	readonly fullClassOrig: string; /** TODO `classNameOrig` */
	/** END Class */

	constructor(data?: StudentFromListInitData) {
		/**
		 * if data is NOT provided - we provide default values.
		 */

		/**
		 * for all optional parameters, we must check if they're present in `data`,
		 * and if NOT - create values for them.
		 *
		 * TODO unique IDs, **unrelated** to the text/id etc. (database will solve this)
		 */
		this.id = data?.id ?? data?.text ?? "";

		/**
		 * typescript screams that
		 * `Property 'XYZ' is used before being assigned.ts(2565)`
		 * even though `Object.assign` clearly assigns the required fields
		 * and will assign the optional fields, if they're provided.
		 *
		 * This is probably a bug.
		 * Currently, instead of using `Object.assign`,
		 * we just manually assign the required values.
		 */
		// Object.assign(this, data);
		this.text = data?.text ?? "";
		this.originalHref = data?.originalHref ?? "";

		this.originalScheduleURI = data?.originalScheduleURI ?? this.parseOriginalScheduleURI();

		this.firstName = data?.firstName ?? this.parseFirstName();
		this.lastName = data?.lastName ?? this.parseLastName();
		this.fullName = data?.fullName ?? this.parseFullName();

		this.classNum = data?.classNum ?? this.parseClassNum();
		this.classChar = data?.classChar ?? this.parseClassChar();
		this.fullClass = data?.fullClass ?? this.parseFullClass();

		this.classNumOrig = data?.classNumOrig ?? this.parseClassNumOrig();
		this.classCharOrig = data?.classCharOrig ?? this.parseClassCharOrig();
		this.fullClassOrig = data?.fullClassOrig ?? this.parseFullClassOrig();
	}

	public static async writeManyToIndividualFiles(
		students: Student[],
		studentsDirPath: string // IScraperConfig["studentsDirPath"]
	): Promise<Student[]> {
		await Promise.all(
			students.map(async (student) => {
				await student.writeToFile(studentsDirPath);
			})
		);

		/** return self for chainability */
		return students;
	}

	public async writeToFile(studentsDirPath: string): Promise<void> {
		const fs = await import("fs-extra");
		const path = await import("path");
		// const prettier = await import("prettier");  /** TODO FIXME - breaks CRA - see https://github.com/sarpik/turbo-schedule/issues/8 */

		const filePath = await this.getFilePath(studentsDirPath);
		const dirPath = path.parse(filePath).dir;

		await fs.ensureDir(dirPath);

		// eslint-disable-next-line prefer-const
		let data: string = JSON.stringify(this);
		// data = prettier.format(data, { parser: "json" });  /** TODO FIXME - breaks CRA - see https://github.com/sarpik/turbo-schedule/issues/8 */

		await fs.writeFile(filePath, data, { encoding: "utf-8" });
	}

	public async getFilePath(studentsDirPath: string): Promise<string> {
		const path = await import("path");

		return path.join(studentsDirPath, `${this.text}.json`);
	}

	// get id(): string {
	// 	return this.text;
	// }

	// get frontPageScheduleURI(): string {
	// 	return frontPageScheduleURI;
	// }

	// get originalScheduleURI(): string {
	// 	return this.frontPageScheduleURI + "/" + this.originalHref;
	// }

	parseOriginalScheduleURI(): string {
		if (!this.originalHref) {
			return "";
		}

		return getSpecificScheduleURI(this.originalHref);
	}

	// get firstName(): string {
	// 	return this.text.split(" ")[1];
	// }

	parseFirstName(): string {
		if (!this.text) {
			return "";
		}

		return this.text.split(" ")[1];
	}

	// get lastName(): string {
	// 	return this.text.split(" ")[0];
	// }
	parseLastName(): string {
		if (!this.text) {
			return "";
		}

		return this.text.split(" ")[0];
	}

	// get fullName(): string {
	// 	return this.firstName + " " + this.lastName;
	// }
	parseFullName(): string {
		if (!this.firstName || !this.lastName) {
			return "";
		}

		return `${this.firstName} ${this.lastName}`;
	}

	/**
	 * the `text` might not be correct,
	 * but the `originalHref` always is.
	 * It's harder to parse it though:D
	 */
	// get classNum(): number {
	// 	const classNumStr: string = this.originalHref /**  "x300111e_melni_kip220.htm"        */
	// 		.split("_") /**                       ["x300111e", "melni", "kip220.htm"] */
	// 		[0] /**                                "x300111e"                         */
	// 		.slice(0, -1) /**                      "x300111"                          */
	// 		.slice(-2); /**                             "11"                          */

	// 	return Number(classNumStr);
	// }

	/**
	 * TODO test this out lmao
	 * tbh, as long as the upstream does not change anything - we should be fine.
	 */
	parseClassNum(): TClassNum {
		/**
		 * `0` is the only number that evaluates to false.
		 * This might or might not be a good idea -
		 * we'll have to find out.
		 */
		const defaultClassNumValue: TClassNum = 0;

		if (!this.originalHref) {
			return defaultClassNumValue;
		}

		const classNumStr: string = this.originalHref /**  "x300111e_melni_kip220.htm"        */
			.split("_") /**                       ["x300111e", "melni", "kip220.htm"] */
			[0] /**                                "x300111e"                         */
			.slice(0, -1) /**                      "x300111"                          */
			.slice(-2); /**                             "11"                          */

		const classNumDangerous: number = Number(classNumStr);

		if (!Number.isInteger(classNumDangerous)) {
			throw new Error(
				`\
\`classNum\` is NOT an integer!


provided = \`${this.originalHref}\`
parsed & invalid = \`${classNumDangerous}\`,
typeof = \`${typeof classNumDangerous}\``
			);
		}

		if (classNumDangerous < classNumMin || classNumDangerous > classNumMax) {
			throw new Error(
				`\
\`classNum\` was out of range!

min = \`${classNumMin}\`,
max = \`${classNumMax}\`,
provided = \`${classNumDangerous}\``
			);
		}

		const classNumSafe: TClassNum = classNumDangerous as TClassNum;

		return classNumSafe;
	}

	// get classChar(): string {
	// 	const classChar: string = this.originalHref /**  "x300111e_melni_kip220.htm"        */
	// 			.split("_") /**                 ["x300111e", "melni", "kip220.htm"] */
	// 			[0] /**                          "x300111e"                         */
	// 			.slice(-1) /**                          "e"                         */;

	// 	return classChar;
	// }

	parseClassChar(): string {
		if (!this.originalHref) {
			return "";
		}

		const classChar: string = this.originalHref /**  "x300111e_melni_kip220.htm"        */
				.split("_") /**                 ["x300111e", "melni", "kip220.htm"] */
				[0] /**                          "x300111e"                         */
				.slice(-1) /**                          "e"                         */
				.toLowerCase() /** just in *case* (no pun intended xoxo) */;

		return classChar;
	}

	// get fullClass(): string {
	// 	return this.classNum + this.classChar;
	// }
	parseFullClass(): string {
		if (!Number.isInteger(this.classNum) || !this.classChar) {
			return "";
		}

		return this.classNum.toString() + this.classChar;
	}

	/**
	 * should work for all classes,
	 * because the chars we're looking for are always the first ones up until the last one, not including it.
	 */
	parseClassNumOrig(): string {
		const classNumOrig: string = (this.fullClassOrig ?? this.parseFullClassOrig()).slice(0, -1);
		/** "IIIGe" */
		/** "IIIG" */

		return classNumOrig;
	}

	/**
	 * should work for all classes,
	 * because the char we're looking for is always the last one.
	 */
	parseClassCharOrig(): string {
		const classNumOrig: string = (this.fullClassOrig ?? this.parseFullClassOrig()).slice(-1);
		/** "IIIGe" */
		/**     "e" */

		return classNumOrig;
	}

	parseFullClassOrig(): string {
		if (!this.text) {
			return "";
		}

		/**
		 * @NOTE
		 *
		 * The class number + char might
		 * * NOT have the `G` between them,
		 * * have the `G` or `g` as either upper or lower case
		 *
		 * The `text` might contain more than two words:
		 * someone might have two first names or two last names,
		 * and only now I have noticed it:D
		 *
		 * and other bs, because as far as we understand,
		 * it's typed in manually, without selection or assertion.
		 *
		 */
		const splitText: string[] = this.text.split(" ");
		const fullClassOrig: string = splitText[splitText.length - 1];
		/**       "Melnikovas Kipras IIIGe"  */
		/* ["Melnikovas", "Kipras", "IIIGe"] */
		/**                         "IIIGe" */

		return fullClassOrig;
	}
}

export interface StudentWithNonUniqueLessonsInitData extends StudentFromListInitData {
	lessons: NonUniqueLesson[];
}

export class StudentWithNonUniqueLessons extends StudentFromList {
	lessons: NonUniqueLesson[] = [];

	constructor(data?: StudentWithNonUniqueLessonsInitData) {
		super(data);
		Object.assign(this, data);
	}
}

export interface StudentInitData extends StudentWithNonUniqueLessonsInitData {
	lessons: Lesson[];
}

/**
 * Student with the Unique lessons
 */
export class Student extends StudentFromList {
	/**
	 * TODO
	 * TODO - consider `readonly`
	 */
	// lessons: Array<Lesson["id"] | Lesson> = [];
	lessons: Lesson[] = [];

	/**
	 * TODO SOON
	 */
	// friends!: Friend[]; //= [];

	// get friends(): Array<Friend["id"] | Friend> {
	// 	return [];
	// }

	constructor(data?: StudentInitData) {
		super(data);
		Object.assign(this, data);
	}
}
