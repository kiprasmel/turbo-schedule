/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React, { FC } from "react";
import { css, cx } from "emotion";

export const Divider: FC<{ height?: string; className?: string }> = (props) => (
	<div
		{...props}
		className={cx(
			css`
				height: ${props.height || "2px"};
				background: #000;
			`,
			props.className
		)}
	/>
);
