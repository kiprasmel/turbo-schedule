import { useState, useEffect } from "react";

import { Participant } from "@turbo-schedule/common";

export const useFetchParticipants = () => {
	const [participants, setParticipants] = useState<Participant[]>([]); /** TODO `swr` */

	useEffect(() => {
		fetch(`/api/v1/participant`)
			.then((res) => res.json())
			.then((data: { participants: Participant[] }) => setParticipants(data.participants));
	}, []);

	return [participants, setParticipants] as const;
};
