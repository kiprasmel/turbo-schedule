/* eslint-disable react/prop-types */

import React, { FC } from "react";
import { css } from "emotion";

export const StrikeThrough: FC<{ shouldStrike: boolean }> = ({ shouldStrike = true, children }) => (
	<span
		className={css`
			position: relative;
			&:after {
				display:  ${shouldStrike ? "inherit" : "none"};

				content: "";
				background-color: #000;

				position: absolute;
				top: 50%;
				left: 50%;

				transform: translate(-50%, -50%);

				width: 120%;
				height: 2px;
				}
			}
		`}
	>
		{children}
	</span>
);
