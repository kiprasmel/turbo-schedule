import { useRef } from "react";

export const useRenderCount = (textPrefix: string = "") => {
	// eslint-disable-next-line prefer-const
	let renders = useRef(0);
	console.log(textPrefix, "renders", renders.current++);
};
