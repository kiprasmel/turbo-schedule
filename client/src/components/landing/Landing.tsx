import React, { useState, useEffect } from "react";
import { css } from "emotion";

import { Participant } from "@turbo-schedule/common";

import { useFetchParticipants } from "../../hooks/useFetchers";
import { history } from "../../utils/history";
import { ParticipantListList } from "../studentSchedule/ParticipantList";
import { Search } from "../navbar/Search";
import { Navbar } from "../navbar/Navbar";
import Footer from "../footer/Footer";

/** TODO FIXME WWidth - this bad boy ain't even re-sizing */
const Landing = () => {
	const [searchString, setSearchString] = useState<string>("");

	const [participants] = useFetchParticipants([], []);
	const [matchingParticipants, setMatchingParticipants] = useState<Participant[]>([]);

	useEffect(() => {
		if (!searchString || !searchString.trim()) {
			setMatchingParticipants(participants);
		}

		const newParticipants: Participant[] = participants.filter(
			({ text }) => !!text.toLowerCase().match(searchString.toLowerCase())
		);

		setMatchingParticipants(newParticipants);
	}, [searchString, participants]);

	/**
	 *  select first autoCompletion
	 *
	 * TODO FIXME status reports instead ((set)searchString) & handle stuff better
	 *
	 */
	const handleOnKeyDown = (e: React.KeyboardEvent) => {
		if (!(e.key === "Enter" && matchingParticipants.length === 1)) {
			return;
		}

		const match: string = matchingParticipants[0].text;
		history.push(`/${match}`);
	};

	return (
		<>
			<div
				className={css`
					min-height: 100vh;
				`}
			>
				<Navbar disableWarningAboutOutdatedData />

				<div
					className={css`
						margin-top: 2em;
						margin-bottom: 1em;

						& > * + * {
							margin-top: 4em;
						}
					`}
				>
					<Search searchString={searchString} setSearchString={setSearchString} onKeyDown={handleOnKeyDown} />
					<ParticipantListList participants={matchingParticipants} />
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Landing;
