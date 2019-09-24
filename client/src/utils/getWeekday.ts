/**
 * @function getWeekday
 *
 * @returns IWeekdayIndex
 *
 * Monday: 0
 * Tuesday: 1
 * ...
 * Saturday: 5
 * Sunday: 6
 *
 * ---
 *
 * js's `new Date.getDay()` returns a weekday,
 * but it starts NOT from monday,
 * but from sunday!!!
 *
 * This is a "sane" implementation
 * (
 * 	I call it "sane" because I'm used to having
 * 	the week start with mondays
 * )
 */

export type IWeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const getWeekdayIndex = (): IWeekdayIndex => {
	/**
	 * @param todaysDayIndex
	 *
	 * Sunday:0
	 * Monday: 1
	 * ...
	 * Saturday:6
	 *
	 */
	const todaysDayIndexSundayFirst: number = new Date().getDay();

	/**
	 * @param todaysDayIndexMondayFirst
	 *
	 * Monday: 0
	 * Tuesday: 1
	 * ...
	 * Sunday: 6
	 */
	const todaysDayIndexMondayFirst: number =
		todaysDayIndexSundayFirst === 0
			? 6 /** `sunday: 0` => `sunday: 6` */
			: todaysDayIndexSundayFirst - 1; /** `Xday: N` => `Xday: N - 1` */

	/**
	 * @param todaysWeekday
	 *
	 * I'm pretty sure we do NOT need any validation here
	 * since it's guaranteed that the day's index
	 * will be between `0` and `6`.
	 *
	 */
	const todaysWeekday: IWeekdayIndex = todaysDayIndexMondayFirst as IWeekdayIndex;

	return todaysWeekday;
};
