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

	return { windowWidth, isDesktop };
};
