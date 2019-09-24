import { useRef } from "react";

export const useRenderCount = (textPrefix: string = "") => {
	let renders = useRef(0);
	console.log(textPrefix, "renders", renders.current++);
};
