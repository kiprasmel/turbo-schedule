import React from "react";
import { Router } from "react-router-dom";
import { render, RenderOptions, Queries, queries } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SetupServerApi, setupServer } from "msw/node";
import { History, createBrowserHistory } from "history";

import CurrentLangContextProvider from "./components/currentLangContext/CurrentLangContextProvider";

export * from "@testing-library/react";
export * from "msw";
export * from "msw/node";

/** BEGIN ez-copy-pasta */
export interface RenderWrapOptions<
	Q extends Queries = typeof queries,
	Container extends Element | DocumentFragment = HTMLElement
> extends RenderOptions<Q, Container> {
	history?: History;
}

export const renderWrap = (
	ui: Parameters<typeof render>[0], //
	{
		history = createBrowserHistory(), //
		...options
	}: RenderWrapOptions = {}
): ReturnType<typeof render> =>
	render(ui, {
		legacyRoot: false,
		wrapper: function Wrapper({ children }) {
			return (
				<>
					<CurrentLangContextProvider currentLang="en">
						<Router history={history}>{children}</Router>
					</CurrentLangContextProvider>
				</>
			);
		},
		...options,
	});

/** END ez-copy-pasta */

export const completeServerSetup = (server: SetupServerApi): void => {
	// Enable API mocking before tests.
	beforeAll(() => server.listen());

	// Reset any runtime request handlers we may add during the tests.
	afterEach(() => server.resetHandlers());

	// Disable API mocking after the tests are done.
	afterAll(() => server.close());
};

export const setupServerFull = (...handlers: Parameters<typeof setupServer>): ReturnType<typeof setupServer> => {
	const server = setupServer(...handlers);

	completeServerSetup(server);

	return server;
};
