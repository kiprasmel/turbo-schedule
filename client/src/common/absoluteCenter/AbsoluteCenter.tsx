/**
 * https://css-tricks.com/centering-css-complete-guide/
 */

import React, { FC } from "react";

const AbsoluteCenter: FC<{ className?: string }> = ({ children, className }) => (
	<div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
		<div style={{ overflow: "auto", resize: "both" }} className={className}>
			{children}
		</div>
	</div>
);

export default AbsoluteCenter;
