import React, { useState, useEffect } from "react";

import { Participant } from "@turbo-schedule/common";

import { ParticipantListList } from "../studentSchedule/ParticipantList";
import { Search } from "../navbar/Search";
import { Navbar } from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Landing = () => {
	const [searchString, setSearchString] = useState<string>("");

	const [participants, setParticipants] = useState<Participant[]>([]);

	useEffect(() => {
		fetch(`/api/v1/participant`)
			.then((res) => res.json())
			.then((data: { participants: Participant[] }) => setParticipants(data.participants));
	}, [setParticipants]);

	useEffect(() => {
		if (!searchString || !searchString.trim()) {
			return;
		}

		const newParticipants: Participant[] = participants.filter(
			({ text }) => !!text.toLowerCase().match(searchString.toLowerCase())
		);

		setParticipants(newParticipants);
	}, [searchString, participants]);

	return (
		<>
			<Navbar />

			<Search searchString={searchString} setSearchString={setSearchString} />

			<ParticipantListList participants={participants} />

			<Footer />
		</>
	);
};

export default Landing;
