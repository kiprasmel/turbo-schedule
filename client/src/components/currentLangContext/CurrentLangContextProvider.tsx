import React, { FC, useState } from "react";

import { ICurrentLangContextValue, CurrentLangContext } from "./currentLangContext";

import { ILang, defaultLang, availableLangs } from "../../i18n/i18n";

export interface ICurrentLangContextProviderProps {
	/** nothing yet, except `children` by default */
}

const CurrentLangContextProvider: FC<ICurrentLangContextProviderProps> = ({ children }) => {
	const [contextValue, setContextValue] = useState<ICurrentLangContextValue>({
		availableLangs: availableLangs,
		currentLang: defaultLang,
		setLang: (newLang: ILang = defaultLang): ILang => {
			/**
			 * update self to trigger a re-render
			 * (
			 * comparisons are made using references -
			 * see https://reactjs.org/docs/context.html#contextprovider
			 * )
			 */
			setContextValue((_contextValue) => ({ ...contextValue, currentLang: newLang }));

			return contextValue.currentLang;
		},
	});

	// const [contextValue, setContextValue] = useState<ICurrentLangContextValue>({
	// 	availableLangs: availableLangs,
	// 	currentLang: defaultLang,
	// 	setLang: (newLang: ILang = defaultLang): ILang => {
	// 		/**
	// 		 * update self to trigger a re-render
	// 		 * (
	// 		 * comparisons are made using references -
	// 		 * see https://reactjs.org/docs/context.html#contextprovider
	// 		 * )
	// 		 */
	// 		setContextValue((_contextValue) => ({ ...contextValue, currentLang: newLang }));

	// 		return contextValue.currentLang;
	// 	},
	// });

	return (
		<>
			<CurrentLangContext.Provider value={contextValue}>{children}</CurrentLangContext.Provider>
		</>
	);
};

export default CurrentLangContextProvider;
