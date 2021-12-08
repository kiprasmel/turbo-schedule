import { Availability, getDefaultParticipant, Participant, Health } from "@turbo-schedule/common";
import { createUseFetchedState } from "use-fetched-state";

/**
 * TODO: could be auto-generated from the express api :o
 */

// TODO FIXME
// @ts-expect-error
export const useFetchParticipant = createUseFetchedState<
	{ participant: Participant }, //
	Participant,
	string
>(
	(participantName) => `/api/v1/participant/${encodeURIComponent(participantName)}`,
	(data) => data.participant ?? getDefaultParticipant()
);

type LessonlessP = Omit<Participant, "lessons">;
export const useFetchParticipants = createUseFetchedState<
	{ participants?: LessonlessP[] }, //
	LessonlessP[]
>(
	"/api/v1/participant", //
	(data) => data?.participants ?? []
);

export const useFetchAvailability = createUseFetchedState<
	{ availability?: Availability[][] }, //
	Availability[][],
	{ wantedParticipantsString: string }
>(
	({ wantedParticipantsString }) =>
		`/api/v1/participant/common-availability?wanted-participants=${wantedParticipantsString}`, //
	(data) => data?.availability ?? []
);

export const useFetchJoinMailingList = createUseFetchedState<boolean>(
	`/api/v1/email`, //
	(data) => data
);

// const [email, setEmail, isLoading] = useFetchJoinMailingList(undefined, [], {
// 	fetchOpts: {
// 		method: "POST",
// 		body: JSON.stringify({ email: "lmao@kek.asdasasdasd" }), //
// 		headers: {
// 			"content-type": "application/json",
// 		},
// 	},
// 	onSuccess: () => {},
// 	onError: () => {},
// });

export const useFetchHealth = createUseFetchedState<{ health: Health }, Health>(
	"/api/v1/health", //
	(data) => data.health
);
