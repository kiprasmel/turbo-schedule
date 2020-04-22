/* eslint-disable lines-between-class-members */

// eslint-disable-next-line max-classes-per-file
import { Constructor } from "../../Constructor";

export const HasFullNameMixin = <TBaseClass extends Constructor>(BaseClass: TBaseClass = class {} as TBaseClass) =>
	class extends BaseClass {
		firstName: string = "";
		lastName: string = "";
		fullName: string = "";
	};
