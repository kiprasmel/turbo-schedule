import { Availability, Participant } from "@turbo-schedule/common";
import { createUseFetchedState } from "use-fetched-state";

/**
 * TODO: could be auto-generated from the express api :o
 */

// export const useFetchStudentsShouldError = createUseStateFetch<StudentFromList[]>(
// 	"/api/v1/participant",
// 	(data) => data.participants
// )({ ctx: {} });

// export const useFetchStudentShouldError = createUseStateFetch<StudentFromList[]>(
// 	({ studentName }) => `/api/v1/participant/${encodeURIComponent(studentName)}`,
// 	(data) => data.participants
// )({});

export const useFetchParticipant = createUseFetchedState<Participant, string>(
	(participantName) => `/api/v1/participant/${encodeURIComponent(participantName)}`,
	(data) => data.participant
);

export const useFetchParticipants = createUseFetchedState<Omit<Participant, "lessons">[]>(
	"/api/v1/participant",
	(data) => data.participants
);

export const useFetchAvailability = createUseFetchedState<Availability[][], { wantedParticipantsString: string }>(
	({ wantedParticipantsString }) =>
		`/api/v1/participant/common-availability?wanted-participants=${wantedParticipantsString}`,
	(data) => data?.availability ?? []
);

// export const useFetchJoinMailingList = createUseFetchedState<boolean>(
// 	`/api/v1/email`,
// 	(data) => data?.availability ?? []
// )(undefined, [], {
// 	fetchOpts: {
// 		method: "POST",
// 		body: JSON.stringify({ email }), //
// 		headers: {
// 			"content-type": "application/json",
// 		},
// 	},
// });
