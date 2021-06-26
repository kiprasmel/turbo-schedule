import React, { FC } from "react";
import { css } from "emotion";

interface IndentProps {
	//
}

export const Indent: FC<IndentProps> = ({ children }) => (
	<div
		className={css`
			display: flex;
			flex-direction: row;

			position: relative;
		`}
	>
		{/* <div
			className={css`
				width: 4px;
				background: #333;
				color: #333;

				margin-left: 2%;
			`}
		/> */}

		<div
			className={css`
				margin-left: 3%;

				::before {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 10px;
					display: block;
					width: 3px;
					content: "";
					background-color: #333;
				}
			`}
		>
			{children}
		</div>
	</div>
);
