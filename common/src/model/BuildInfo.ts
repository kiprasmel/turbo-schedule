export type BuildInfo = {
	commitShort: string;
	commitFull: string;
	commitURL: string;
	/** has untracked changes */
	isCommitDirty: boolean;
	branch: string;
	branchURL: string;
	dateISO: string;
}

const defaultBuildInfo: BuildInfo = {
	commitShort: "",
	commitFull: "",
	commitURL: "",
	isCommitDirty: false,
	branch: "",
	branchURL: "",
	dateISO: "",
};

/** just makes sure the default is not modified */
export const getDefaultBuildInfo = (): BuildInfo => ({ ...defaultBuildInfo });
