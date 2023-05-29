export interface ArchiveLostFound {
	found: boolean;
	snapshots: string[];
}

export const getDefaultArchiveLostFound = (): ArchiveLostFound => ({
	found: false,
	snapshots: [],
});
