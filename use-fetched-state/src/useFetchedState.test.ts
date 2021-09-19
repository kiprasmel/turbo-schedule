import { noop } from "@turbo-schedule/common";
import { createUseFetchedState } from "./useFetchedState";

createUseFetchedState<1, 1>(
	"", //
	(data) => data
)(1, []);

createUseFetchedState<1, 1, string>(
	(x) => x + "/kek",
	(data) => data
)(1, [], { urlCtx: "some_x" });

// TODO FIXME - no err
// createUseFetchedState<string, string>(
// 	"", //
// 	(data) => data
// )("kek", []);

// TODO FIXME - no err
// createUseFetchedState<string, string, number>(
// 	(id) => `/user/${id}`, //
// 	(data) => data
// )("kek", [], { urlCtx: 2 });

type ResponseJson = { body: { some: { thing: number } } };

createUseFetchedState<ResponseJson, ResponseJson["body"]>(
	(id) => `/api/v1/${id}`,
	(data) => data.body
)({ some: { thing: 0 } }, [], { urlCtx: 123 });

createUseFetchedState<ResponseJson, ResponseJson["body"], { id: number }>(
	({ id }) => `/api/v1/${id}`,
	(data) => data.body
)({ some: { thing: 0 } }, [], { urlCtx: { id: 123 } });

/** README example: */

interface IUser {
	name: string;
	id: number;
}

const getDefaultUser = (): IUser => ({ name: "", id: -1 });

// TODO FIXME (works just fine in CI tho)
const useFetchedUser = createUseFetchedState<{ user?: IUser }, IUser, number>(
	(id) => `/api/v1/user/${id}` /** can also be just a string */,
	(data) => data.user ?? getDefaultUser()
);

// eslint-disable-next-line react-hooks/rules-of-hooks
const stuff = useFetchedUser(
	getDefaultUser, // /**  initial state */,
	[] /** dependencies to trigger re-fetch */,
	{
		/** option(s) for the URL creator: */
		urlCtx: 1,
		/** options: */
		fetchOpts: {} /** AbortController setup & enabled by default */,
		shouldFetch: (_ctx) => true /** true by default, but controllable here */,
		onError: (e, _ctx) => console.error(e),
		onSuccess: (u, _ctx) => console.info(`fetched user ${u.name}`),
		onSetState: async (_ctx) => {
			//
		},
	}
);
noop(stuff);
