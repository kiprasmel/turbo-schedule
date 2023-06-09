export const padRight = (longest: string) => (curr: string): string => {
	const missing: number = longest.length - curr.length;
	return curr + " ".repeat(missing);
};

export const padLeft = (longest: string) => (curr: string): string => {
	const missing: number = longest.length - curr.length;
	return " ".repeat(missing) + curr;
};
