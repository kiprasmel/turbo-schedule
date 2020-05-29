import React, { useState, useEffect } from "react";
import { css } from "emotion";

import { Participant } from "@turbo-schedule/common";

import { ParticipantListList } from "../studentSchedule/ParticipantList";
import { Search } from "../navbar/Search";
import { Navbar } from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Landing = () => {
	const [searchString, setSearchString] = useState<string>("");

	const [participants, setParticipants] = useState<Participant[]>([]); /** TODO `swr` */
	const [matchingParticipants, setMatchingParticipants] = useState<Participant[]>([]);

	useEffect(() => {
		fetch(`/api/v1/participant`)
			.then((res) => res.json())
			.then((data: { participants: Participant[] }) => setParticipants(data.participants));
	}, []);

	useEffect(() => {
		if (!searchString || !searchString.trim()) {
			setMatchingParticipants(participants);
		}

		const newParticipants: Participant[] = participants.filter(
			({ text }) => !!text.toLowerCase().match(searchString.toLowerCase())
		);

		setMatchingParticipants(newParticipants);
	}, [searchString, participants]);

	return (
		<>
			<Navbar />

			<div
				className={css`
					& > * + * {
						margin-top: 4em;
					}
				`}
			>
				<Search searchString={searchString} setSearchString={setSearchString} />
				<ParticipantListList participants={matchingParticipants} />
			</div>

			<Footer />
		</>
	);
};

export default Landing;
