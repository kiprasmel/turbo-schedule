/**
 * https://css-tricks.com/centering-css-complete-guide/
 */

import React from "react";

// export interface IAbsoluteCenterProps {
// 	style
// }

/**
 * Issues with blurry borders
 */

// const AbsoluteCenter = ({ children }: React.Props<any>) => {
// 	return (
// 		<div style={{ height: "100vh", position: "relative" }}>
// 			<div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
// 				{children}
// 			</div>
// 		</div>
// 	);
// };

const AbsoluteCenter = ({ children }: React.Props<any>) => (
	<div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
		<div style={{ overflow: "auto", resize: "both" }}>{children}</div>
	</div>
);

export default AbsoluteCenter;
