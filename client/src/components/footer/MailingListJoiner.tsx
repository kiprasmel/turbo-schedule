import React, { useState } from "react";

import "./MailingListJoiner.scss";

import axios from "axios";
import { useTranslation } from "../../i18n/useTranslation";

// import { useIntl } from "react-intl";

// const { formatMessage } = useIntl();

// formatMessage({ id: "foo" }, {});

export const joinMailingList = async (email: string) => {
	// try {
	const emailEntry = await axios.post("/api/email", { email: email });
	return emailEntry;
	// } catch (err) {
	// 	console.log("Error!", err);
	// }
};

const MailingListJoiner = () => {
	const t = useTranslation();
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleEmailSubmit = async (_e?: React.MouseEvent) => {
		try {
			if (isSubmitting || submitted) {
				return;
			}

			setIsSubmitting(true);

			await joinMailingList(email);

			setSubmitted(true);
			setEmail("");
			setIsSubmitting(false);
		} catch (err) {
			console.error("Error!", err);

			setSubmitted(false);
			setIsSubmitting(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleEmailSubmit();
		}
	};

	return (
		<>
			<h3>{t("Interested in what's coming next?")}</h3>
			<p>{t("Enter email get notified")}</p>

			<small>
				({t("we promise to not spam!")}) ({t("you can cancel anytime")})
			</small>

			<div style={{ marginTop: "1em", marginBottom: "1em" }}>
				<input
					type="email"
					placeholder={t("eg.") + " kipras@kipras.org"}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onKeyDown={(e) => handleKeyDown(e)}
					style={{
						border: "1px solid rgb(238, 238, 238)",
						outlineColor: "rgb(138, 138, 138)",

						padding: "12px 16px",
						margin: "auto",
						display: "block",
					}}
				/>

				<br />

				{/* <input type="submit" value="Pranešti man apie atnaujinimus!"  /> */}
				<button
					type="submit"
					className={"btn btn--round"}
					style={{
						cursor: isSubmitting || submitted ? "not-allowed" : "pointer",
					}}
					disabled={isSubmitting || submitted}
					// 	color: "#fff",
					// 	background: "dodgerBlue",
					// 	border: "1px solid dodgerBlue",
					// 	borderRadius: "10em",
					// 	margin: "auto",
					// 	display: "block",
					onClick={(e) => handleEmailSubmit(e)}
					// disabled={isSubmitting}
				>
					{t("Notify me about the updates!")}
				</button>

				{submitted && <h3>{t("Email received successfully - thank You for trusting us:)")}</h3>}

				{/* <div style={{ marginBottom: "8em" }}></div> */}
			</div>
		</>
	);
};

export default MailingListJoiner;
