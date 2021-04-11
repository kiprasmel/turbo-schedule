import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const useHighlightElementById = <T extends HTMLElement>(
	htmlId: string, //
	ref: React.RefObject<T> | null,
	fromBg: string = "#fbf2d4",
	toBg: string = "initial"
): void => {
	const location = useLocation();

	useEffect(() => {
		if (location.hash.slice(1) === htmlId) {
			if (ref?.current) {
				ref.current.scrollIntoView({ behavior: "smooth", block: "center" });

				ref.current.style.backgroundColor = fromBg;

				setTimeout(() => {
					if (ref?.current) {
						ref.current.style.transition = "background 2s ease-out 1s";
						ref.current.style.backgroundColor = toBg;
					}
				}, 0);
			}
		}
	}, [htmlId, ref, fromBg, toBg, location.hash]);
};
