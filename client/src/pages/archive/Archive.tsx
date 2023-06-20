import React, { FC } from "react";
import { css } from "emotion";

import { ParticipantListList } from "../../components/studentSchedule/ParticipantList";
import { useFetchArchiveParticipantsInSnapshots } from "../../hooks/useFetchers";
import { ParticipantLabelToTextToSnapshotObj } from "@turbo-schedule/database";

// const ARCHIVES_DATA = [
// 	{
// 		year: "2023",
// 		snapshots: ["1", "2", "3"],
// 		students: ["a", "b", "c"],
// 		teachers: ["d", "e", "f"],
// 		rooms: ["g", "h", "i"],
// 		classes: ["j", "k", "l"],
// 	},
// 	{
// 		year: "2022",
// 		snapshots: ["4", "5", "6", "7", "8"],
// 		students: ["a", "b", "c"],
// 		teachers: ["d", "e", "f"],
// 		rooms: ["g", "h", "i"],
// 		classes: ["j", "k", "l"],
// 	}
// ] as const;

export const Archive: FC = () => {
	const [ARCHIVES_DATA] = useFetchArchiveParticipantsInSnapshots({}, []);

	console.log({ARCHIVES_DATA})

	// let a
	return <div>
		<h1 className={css`
		 	margin-top: 5rem;
			margin-bottom: 2.5rem;
		`}>Archyvai</h1>

		<ul className={css`
			& > * + * {
				margin-top: 6rem;
			}
		`}>
			{Object.entries(ARCHIVES_DATA).map(([year, yearData]) => (
				<li key={year}>
					{/* <h2><span>{archive.year}</span> (<span>{participantCount(archive)}</span> participants in <span>{archive.snapshots.length}</span> snapshots)</h2> */}
					<hgroup>
						<h2 className={css` margin-bottom: 0.5rem; `}><span>{year}</span></h2>
						{/* <h4 className={css` margin-top: 0; `}><span>{archive.snapshots.length}</span> snapshots with <span>{participantCount(archive)}</span> unique participants</h4> */}
					</hgroup>

					{/* <ParticipantListList doNotShowMostRecents participants={archive as any} /> */}
					<ParticipantListList doNotShowMostRecents participants={(yearData as ParticipantLabelToTextToSnapshotObj)} />
				</li>
			))}
		</ul>
	</div>;
};

/**
 * TODO FIXME: count unique participants *within all snapshots*.
 */
export const participantCount = ({students, teachers, rooms, classes}: any /** TODO TS */): number => students.length + teachers.length + rooms.length + classes.length;
