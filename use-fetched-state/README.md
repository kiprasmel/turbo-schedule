# use-fetched-state

<a href="https://www.npmjs.com/package/use-fetched-state">
    <img alt="npm package" src="https://img.shields.io/npm/v/use-fetched-state">
</a>

<p style="margin:1.5em 0;">
A simple yet convenient `fetch` + `useState` wrapper. 100% TS. Less than 200 LOC. 0 dependencies.
<!-- SLOC, ofc, but it doesn't sound as smooth -->
</p>

Please [submit PRs / create issues](https://github.com/kiprasmel/turbo-schedule/tree/master/use-fetched-state) if (simple) functionality missing.

## Example

```ts
import React, { FC } from "react";
import { createUseFetchedState } from "use-fetched-state";

interface IUser {
    name: string;
    id: number;
}

const getDefaultUser = (): IUser => ({ name: "", id: -1 });

const useFetchedUser = createUseFetchedState<{ user?: IUser }, IUser, number>(
    (id) => `/api/v1/user/${id}` /** can also be just a string */,
    (data) => data.user ?? getDefaultUser()
);

const User: FC = () => {
    const [user, setUser, isLoading] = useFetchedUser(
        () => getDefaultUser() /** (get) initial state */,
        [] /** dependencies to trigger re-fetch */,
        {
            /** option(s) for the URL creator: */
            urlCtx: 1,
            /** options: */
            fetchOpts: {} /** AbortController setup & enabled by default */,
            shouldFetch: (ctx) => true /** true by default, but controllable here */,
            onError: (e, ctx) => console.error(e),
            onSuccess: (u, ctx) => console.info(`fetched user ${u.name}`),
            onSetState: async (ctx) => {} /** potentially up-sync the new state to the API */
        }
    );

    if (isLoading) return null;

    return <h1>hello, {user.name}</h1>;
};

```

## License

[MIT](./LICENSE)
