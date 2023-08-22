import React, { FC } from "react"
import { css } from "emotion"

import { BuildInfo, getDefaultHealth } from "@turbo-schedule/common"

import { useFetchHealth } from "../../hooks/useFetchers"

export const BuildMetaInfo: FC<{}> = () => {
	const [{ buildInfo }] = useFetchHealth(getDefaultHealth(), [])

	if (!buildInfo) {
		return null
	}

	return <BuildMetaInfoStandalone buildInfo={buildInfo}  />
}

export type BuildMetaInfoProps = {
	buildInfo: BuildInfo
}

export const BuildMetaInfoStandalone: FC<BuildMetaInfoProps> = ({ buildInfo }) => {
	const DirtyIndicator = !buildInfo.isCommitDirty
		? null
		: <span title="repo had uncommitted changes when building.">-dirty</span>

	return <small title="build info" className={css`
		font-size: 10px;
	`}>
		{/* eslint-disable-next-line react/jsx-no-target-blank */}
		<a title={"commit " + buildInfo.commitFull} href={buildInfo.commitURL} target="_blank" rel="noopener" className={underlinedLinkStyle}>{buildInfo.commitShort}</a>{DirtyIndicator}
		{" "}
		from
		{" "}
		{/* eslint-disable-next-line react/jsx-no-target-blank */}
		<a title="branch" href={buildInfo.branchURL} target="_blank" rel="noopener" className={underlinedLinkStyle}>{buildInfo.branch}</a>
		{" "}
		at
		{" "}
		<span>{buildInfo.dateISO}</span>
	</small>
}

export const underlinedLinkStyle = css`
	text-decoration: underline !important;
`
