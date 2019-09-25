import React, { FC } from "react";
import ReactModal from "react-modal";
import { useTranslation } from "i18n/useTranslation";

/**
 * http://reactcommunity.org/react-modal/accessibility/#app-element
 */
ReactModal.setAppElement("#root");

interface ICloseBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	handleClose: () => any;
	text?: string;
}
const CloseBtn: FC<ICloseBtnProps> = ({ handleClose, text, ...rest }) => {
	const t = useTranslation();

	if (!text) {
		text = t("Close");
	}

	return (
		<button
			onClick={(_e) => handleClose()}
			className="btn btn--big"
			style={{
				padding: "8px 16px",
			}}
			{...rest}
		>
			{text}
		</button>
	);
};

const StudentListModal = ({ handleClose, lesson, isOpen, ...rest }: any) => {
	const t = useTranslation();

	return (
		<>
			<ReactModal
				shouldCloseOnEsc={true}
				shouldCloseOnOverlayClick={true}
				shouldFocusAfterRender={true}
				shouldReturnFocusAfterClose={true}
				isOpen={isOpen}
				onRequestClose={() => handleClose()}
				{...rest}
			>
				<CloseBtn handleClose={handleClose} style={{ marginTop: "1em" }} autoFocus />

				<div style={{ marginTop: "1em" }}>
					<p style={{ margin: 0 }}>{t("Lesson")}:</p>
					{lesson.name || t("Empty__lesson")}
				</div>

				<div style={{ marginTop: "1em" }}>
					<p>
						{t("Students")} ({lesson.students.length}):
					</p>
					<ul style={{ listStyle: "disc", paddingLeft: "30px" }}>
						{lesson.students.map((student: string, index: number) => (
							<li key={index}>{student}</li>
						))}
					</ul>
				</div>

				<CloseBtn handleClose={handleClose} style={{ marginTop: "1em" }} />
			</ReactModal>
		</>
	);
};

export default StudentListModal;
