export interface ScrapeInfo {
	timeStartISO: string;
	timeEndISO: string;
	timeElapsedInSeconds: number;

	/** used to identify if anything on the page changed & thus should it be updated */
	pageVersionIdentifier: string;
}

const defaultScrapeInfo: ScrapeInfo = {
	timeStartISO: "",
	timeEndISO: "",
	timeElapsedInSeconds: -1,
	pageVersionIdentifier: "",
};

/** just makes sure the default is not modified */
export const getDefaultScrapeInfo = (): ScrapeInfo => ({ ...defaultScrapeInfo });
