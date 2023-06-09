import { _Perf } from "./perf.core";

export type KnownOps =
	| "init-db" //
	| "send"
	| "db-get-participants";

export type KnownIds =
	| "participant-list" //
	| "participant-with-lessons"
	| "participant-randoms"
	| "participant-common-avail"
	| "participant-classifier"
	| "participant-hierarchy";
//

export class Perf extends _Perf<KnownOps, KnownIds> {}
