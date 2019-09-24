import React from "react";
import { useTranslation } from "../i18n/useTranslation";

const Loading = () => {
	const t = useTranslation();

	/** FIXME - this is very resource-heavy & just bad */

	// // const [dots, setDots] = useState("");

	// // useEffect(() => {
	// // 	let index = 0;
	// // 	const interval = setInterval(() => {
	// // 		const howManyTimesToRepeat = index % 4;
	// // 		let newDots: string = "";
	// // 		for (let i = 0; i < howManyTimesToRepeat; ++i) {
	// // 			newDots += ".";
	// // 		}
	// // 		console.log("-> newDots", newDots);

	// // 		setDots(newDots);
	// // 		index++;
	// // 	}, 500);
	// // });

	/** END FIXME */

	return (
		<>
			<h3>{t("Loading data")}</h3>
		</>
	);
};

export default Loading;
