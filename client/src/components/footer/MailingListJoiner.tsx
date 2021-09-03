import React, { useEffect, useState } from "react";
import { css } from "emotion";

import AbsoluteCenter from "../../common/absoluteCenter/AbsoluteCenter";
import { useTranslation } from "../../i18n/useTranslation";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const joinMailingList = async (email: string): Promise<boolean> => {
	try {
		const res = await fetch("/api/v1/email", {
			method: "POST",
			body: JSON.stringify({ email }), //
			headers: {
				"content-type": "application/json",
			},
		});

		return !!res.ok;
	} catch (e) {
		return false;
	}
};

const MailingListJoiner = () => {
	const t = useTranslation();
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [hasSubmitted, setHasSubmitted] = useLocalStorage("turbo-schedule.email.has-submitted", false);
	const [hasClosed, setHasClosed] = useLocalStorage("turbo-schedule.email.has-closed", false);

	const closeWithTimeout = (ms = 4000): NodeJS.Timeout => setTimeout(() => setHasClosed(true), ms);

	useEffect(() => {
		if (hasSubmitted) closeWithTimeout();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleEmailSubmit = async (): Promise<void> => {
		try {
			if (isSubmitting || hasSubmitted || hasClosed) {
				return;
			}

			setIsSubmitting(true);

			if (await joinMailingList(email)) {
				setHasSubmitted(true);
				setEmail("");

				closeWithTimeout();
			}

			setIsSubmitting(false);
		} catch (err) {
			console.error("Error!", err);

			setHasSubmitted(false);
			setIsSubmitting(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent): void => {
		if (e.key === "Enter") {
			handleEmailSubmit();
		}
	};

	if (hasClosed) return null;

	return (
		<AbsoluteCenter className={css``}>
			<div
				className={css`
					vertical-align: middle;
				`}
			>
				<h3
					className={css`
						margin: 0;
						position: relative;
					`}
				>
					{t("Interested in what's coming next?")}

					<button
						type="button"
						onClick={(): void => setHasClosed(true)} //
						className={css`
							position: absolute;
							top: -11px;
							right: 0;

							margin: auto;

							font-size: 2rem;
						`}
					>
						&times;
					</button>
				</h3>{" "}
				<p>{t("Enter email get notified")}</p>
				<small>
					({t("we promise to not spam!")}) ({t("you can cancel anytime")})
				</small>
				<div style={{ marginTop: "1em", marginBottom: "1em" }}>
					<input
						type="email"
						placeholder={`${t("eg.")} kipras@kipras.org`}
						value={email}
						onChange={(e): void => setEmail(e.target.value)}
						onKeyDown={(e): void => handleKeyDown(e)}
						style={{
							border: "1px solid rgb(238, 238, 238)",
							outlineColor: "rgb(138, 138, 138)",

							padding: "12px 16px",
							margin: "auto",
							display: "block",
						}}
					/>

					<br />

					<button
						type="submit"
						className="btn btn--round"
						style={{
							cursor: isSubmitting || hasSubmitted ? "not-allowed" : "pointer",
						}}
						disabled={isSubmitting || hasSubmitted}
						onClick={handleEmailSubmit}
					>
						{t("Notify me about the updates!")}
					</button>

					{!hasSubmitted ? null : <h3>{t("Email received successfully - thank You for trusting us:)")}</h3>}
				</div>
			</div>
		</AbsoluteCenter>
	);
};

export default MailingListJoiner;
