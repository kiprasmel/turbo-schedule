import { useState, useEffect } from "react";

/**
 * TODO: resize observer / listener with some throttling I guess
 */
export const useWindow = () => {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
	}, [setWindowWidth]);

	const isDesktop: boolean = windowWidth > 1024;

	const desktop = `@media (min-width: 1024px)` as const;
	const notDesktop = `@media(max-width: 1023px)` as const;

	return { windowWidth, isDesktop, desktop, notDesktop };
};
