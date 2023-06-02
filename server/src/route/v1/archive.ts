import path from "path";

import { Router } from "express";

import { ArchiveLostFound, getDefaultArchiveLostFound } from "@turbo-schedule/common";
import { getDatabaseSnapshotFiles, tryFindParticipantInArchive } from "@turbo-schedule/database";

import { WithErr, withSender } from "../../middleware/withSender";

const router: Router = Router();

export interface ArchiveLostFoundRes extends WithErr, ArchiveLostFound {
	//
}

router.get<{ participantName: string }, ArchiveLostFoundRes>(
	"/lost-found",
	withSender(getDefaultArchiveLostFound()),
	async (req, res) => {
		const send = res.sender;
		const { participantName } = req.query;

		if (!participantName) {
			const err = "query param 'participantName' is required.";
			return send(400, { err });
		}

		try {
			const snapshots: string[] = await tryFindParticipantInArchive(participantName);
			const found = snapshots.length > 0;

			return send(200, { found, snapshots });
		} catch (err) {
			console.log({ err });
			return send(500, { err });
		}
	}
);

export function checkDatabaseSnapshotIsValid(snapshot: string): false | string {
	// TODO OPTIMIZE - only try to check if provided snapshot exists, don't try to check all files:
	const wantedSnapshotPath: string | undefined = getDatabaseSnapshotFiles().find(
		(x) => path.basename(x) === snapshot
	);

	return !wantedSnapshotPath ? false : wantedSnapshotPath;
}

export { router as archiveRouter };
