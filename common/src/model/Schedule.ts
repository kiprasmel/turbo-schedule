/**
 * same for everyone - students, classes, teachers etc.
 */
export const frontPageScheduleURI: string = `http://kpg.lt/Tvarkarastis/Index.htm`;

/** TODO RENAME to `getOriginalScheduleURI` */
export const getSpecificScheduleURI = (href: string): string => (!href ? "" : `http://kpg.lt/Tvarkarastis/${href}`);
