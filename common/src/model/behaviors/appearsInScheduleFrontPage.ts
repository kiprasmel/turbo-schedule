/* eslint-disable max-classes-per-file */
/* eslint-disable lines-between-class-members */

import { Constructor } from "../../Constructor";

export const frontPageScheduleURI: string = `http://kpg.lt/Tvarkarastis/Index.htm`;
export const getSpecificScheduleURI = (href: string): string =>
	href?.trim() ? `http://kpg.lt/Tvarkarastis/${href}` : "";

export const AppearsInScheduleFrontPageMixin = <TBaseClass extends Constructor>(
	BaseClass: TBaseClass = class {} as TBaseClass
) =>
	class extends BaseClass {
		text: string = "";
		originalHref: string = "";
		originalScheduleURI: string = "";
	};
