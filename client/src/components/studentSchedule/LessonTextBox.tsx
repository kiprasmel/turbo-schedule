import React, { FC } from "react";

export interface ILessonTextBox {
	logo: any;
	text: string;
}

export interface LessonTextBoxProps {
	textBox: ILessonTextBox;
}

const LessonTextBox: FC<LessonTextBoxProps> = ({ textBox: { logo, text } }) => (
	<li style={{ fontSize: "20px" }}>
		<img src={logo} alt="" style={{ width: "20px", verticalAlign: "baseline" }} /> <span>{text || "-"}</span>
	</li>
);

export default LessonTextBox;
