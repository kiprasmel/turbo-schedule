import { Router } from "express";

import { recursiveGroupBy } from "recursive-groupby"

import { ArchiveLostFound, getDefaultArchiveLostFound } from "@turbo-schedule/common";
import { ArchiveSnapshotsByYear, ParticipantInSnapshotItem, getArchiveSnapshotsByYear, getParticipantsInSnapshots, tryFindParticipantInArchive } from "@turbo-schedule/database";

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

export type ArchiveSnapshotsByYearRes = WithErr & {
	archiveSnapshotsByYear: ArchiveSnapshotsByYear;
}

router.get<{}, ArchiveSnapshotsByYearRes>(
	"/snapshots-by-year",
	withSender({ archiveSnapshotsByYear: {} }),
	async (_req, res) => {
		const send = res.sender;

		try {
			const archiveSnapshotsByYear: ArchiveSnapshotsByYear = await getArchiveSnapshotsByYear();

			console.log({ archiveSnapshotsByYear });

			return send(200, { archiveSnapshotsByYear });
		} catch (err) {
			return send(500, { err })
		}
	}
);

export type ParticipantsInSnapshotsRes = WithErr & {
	data: ParticipantInSnapshotItem[]; // TODO TS - grouped case (impossible accuratelly tho)
}

export type ParticipantsInSnapshotsParams = {
	group?: string;
	leafItemKey?: string;
}

router.get<ParticipantsInSnapshotsParams, ParticipantsInSnapshotsRes>(
	"/participants-in-snapshots",
	withSender({ data: [] }),
	async (req, res) => {
		const send = res.sender;
		const { group, leafItemKey } = req.query;

		try {
			const participantsInSnapshots: ParticipantInSnapshotItem[] = await getParticipantsInSnapshots();

			if (!group) {
				return send(200, { data: participantsInSnapshots });
			}

			const groupingKeys = group.split(",");
			const dataGrouped = recursiveGroupBy(participantsInSnapshots, groupingKeys, leafItemKey);

			return send(200, { data: dataGrouped as any /** TODO TS */ })
		} catch (err) {
			return send(500, { err })
		}
	}
);

export { router as archiveRouter };
