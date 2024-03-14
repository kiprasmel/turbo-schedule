import React, { useContext } from "react";

import { ILang, defaultLang, availableLangs } from "../../i18n/i18n";

export interface ICurrentLangContextValue {
	availableLangs: Array<ILang>;
	currentLang: ILang;
	setLang: (newLang: ILang) => ILang;
}

let defaultContextValue: ICurrentLangContextValue = {
	availableLangs,
	currentLang: defaultLang,
	/**
	 * warning - `setLang` will NOT actually update the `defaultContextValue` reference as expected,
	 * create a `contextValue` in your react component instead.
	 *
	 * (
	 * I've done this and it's all good,
	 * just know that the `defaultContextValue`
	 * does NOT work properly
	 * )
	 */
	setLang: (newLang: ILang = defaultLang): ILang => {
		defaultContextValue.currentLang = newLang;

		/**
		 * update self to trigger a re-render
		 * (comparisons are made using references)
		 */
		defaultContextValue = { ...defaultContextValue, currentLang: newLang };

		return defaultContextValue.currentLang;
	},
};

export type ICurrentLangContext = React.Context<ICurrentLangContextValue>;

export const CurrentLangContext: ICurrentLangContext = React.createContext<ICurrentLangContextValue>(
	defaultContextValue
);

export const useLang = () => useContext(CurrentLangContext)

