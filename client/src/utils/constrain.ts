export const constrain = (value: number, min: number, max: number): number =>
	value > max ? max : value < min ? min : value;
