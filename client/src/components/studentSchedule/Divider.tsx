/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React, { FC } from "react";
import { css } from "emotion";

export const Divider: FC<{ height?: string; className?: string }> = (props) => (
	<div
		className={css`
			height: ${props.height || "2px"};
			background: #000;
		`}
		{...props}
	/>
);
