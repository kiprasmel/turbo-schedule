/**
 * same for everyone - students, classes, teachers etc.
 */
export const frontPageScheduleURI: string = `https://pranciskonugimnazija.lt/tvarkarastis/`;

/** TODO RENAME to `getOriginalScheduleURI` */
export const getSpecificScheduleURI = (href: string): string =>
	!href ? "" : `https://pranciskonugimnazija.lt/tvarkarastis/${href}`;
