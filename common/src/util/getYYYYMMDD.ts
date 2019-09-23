export const getYYYYMMDD = (yourDate?: number | string | Date) => {
	const date: Date = !yourDate ? new Date() : new Date(yourDate);

	const year: number = date.getUTCFullYear();

	const _month: number = date.getUTCMonth() + 1; /** months are indexed from `0`, so we forward by `1` */
	const month: string = (100 + _month).toString().substring(1); /** `5` => `105` => `05` */

	const _day: number = date.getUTCDate();
	const day: string = (100 + _day).toString().substring(1); /** `5` => `105` => `05` */

	const YYYYMMDD: string = `${year}-${month}-${day}`;

	return YYYYMMDD;
};
