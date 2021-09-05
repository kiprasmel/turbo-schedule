# use-fetched-state

A simple yet convenient `fetch` + `useState` wrapper. 100% TS. Less than 100 LOC. 0 dependencies.
<!-- SLOC, ofc, but it doesn't sound as smooth -->

Please [submit PRs / create issues](https://github.com/kiprasmel/turbo-schedule/tree/master/use-fetched-state) if (simple) functionality missing.

## Example

```ts
import React, { FC } from "react";
import { createUseFetchedState } from "use-fetched-state";

interface IUser {
	name: string;
	id: number;
}

const useFetchedUser = createUseFetchedState<IUser, number>(
	(id) => `/api/v1/user/${id}` /** can also be just a string */,
	(data) => data.user
);

const User: FC = () => {
	const [user, setUser, isLoading] = useFetchedUser(
		{ name: "", id: -1 } /**  initial state */,
		[] /** dependencies to trigger re-fetch */,
		{
			/** option(s) for the URL creator: */
			urlCtx: 1,
			/** options: */
			fetchOpts: {} /** AbortController setup & enabled by default */,
			shouldFetch: (ctx) => true /** true by default, but controllable here */,
			onError: (e, ctx) => console.error(e),
			onSuccess: (u, ctx) => console.info(`fetched user ${u.name}`),
		}
	);

	if (isLoading) return null;

	return <h1>hello, {user.name}</h1>;
};

```

## License

[MIT](./LICENSE)
