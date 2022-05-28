import { performanceNow } from "./performance.now";

type Callback = () => void;

export const throttle = (cb: Callback, ms: number): Callback => {
	let blockUntil: number = -Infinity;
	let eventualTimeout: false | NodeJS.Timeout = false;

	const callbackWrapper: Callback = () => {
		const now: number = performanceNow();
		const delta: number = blockUntil - now;

		if (blockUntil > now) {
			if (!eventualTimeout) {
				eventualTimeout = setTimeout(callbackWrapper, delta + 1);
			}
			return;
		}

		blockUntil = now + ms;
		cb();
		if (eventualTimeout) {
			clearTimeout(eventualTimeout);
			eventualTimeout = false;
		}
	};

	return callbackWrapper;
};
