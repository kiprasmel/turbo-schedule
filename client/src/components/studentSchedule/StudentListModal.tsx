import React, { FC } from "react";
import ReactModal from "react-modal";
import { css } from "emotion";

import { Lesson } from "@turbo-schedule/common";

import { ParticipantListList } from "./ParticipantList";
import { useTranslation } from "../../i18n/useTranslation";

/**
 * http://reactcommunity.org/react-modal/accessibility/#app-element
 * https://github.com/reactjs/react-modal/issues/576#issuecomment-394116847
 */
ReactModal.setAppElement("body");

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

interface Props {
	handleClose: () => any;
	lesson: Lesson | null;
	isOpen: boolean;
}

const StudentListModal: FC<Props> = ({ handleClose, lesson, isOpen, ...rest }) => {
	const t = useTranslation();

	if (!lesson?.students) {
		return null;
	}

	return (
		<>
			<ReactModal
				shouldCloseOnEsc
				shouldCloseOnOverlayClick
				shouldFocusAfterRender
				shouldReturnFocusAfterClose
				isOpen={isOpen}
				onRequestClose={() => handleClose()}
				style={{
					overlay: {
						zIndex: 120,
					},
				}}
				bodyOpenClassName={css`
					text-align: center;

					> div div > * + * {
						margin-top: 2rem;
					}
				`}
				{...rest}
			>
				<CloseBtn handleClose={handleClose} autoFocus />

				<h2>{lesson?.name || t("Empty__lesson")}</h2>

				<ParticipantListList
					participants={lesson}
					className={css`
						grid-template-columns: none !important;
					`}
				/>

				<CloseBtn handleClose={handleClose} />
			</ReactModal>
		</>
	);
};

export default StudentListModal;
