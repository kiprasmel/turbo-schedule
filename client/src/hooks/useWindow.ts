import { useState, useEffect, useRef } from "react";

import { throttle } from "@turbo-schedule/common";

export const useWindow = () => {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

	/**
	 * a ref is needed so that the `throttle` does not get re-called & re-created
	 * once a re-render happens of the hook,
	 * which would make the throttle useless.
	 */
	const handleResize = useRef(
		throttle(() => {
			setWindowWidth(window.innerWidth);
		}, 1000)
	);

	useEffect(() => {
		const handler = handleResize.current;

		window.addEventListener("resize", handler);
		return (): void => window.removeEventListener("resize", handler);
	}, []);

	const isDesktop: boolean = windowWidth > 1024;

	const desktop = `@media (min-width: 1024px)` as const;
	const notDesktop = `@media(max-width: 1023px)` as const;

	return { windowWidth, isDesktop, desktop, notDesktop } as const;
};
