import { constrain } from "./constrain";

/**
 * TODO remove
 */
export const todaysDayIndex = () => {
	const currentDay = new Date().getDay() - 1;
	const constrained = constrain(currentDay, 1, 5);
	console.log("constrained", constrained);

	return constrained;
};
