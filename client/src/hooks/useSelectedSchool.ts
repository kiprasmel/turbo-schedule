import { useEffect, useState } from "react"
import { Location } from "history"

import { history } from "../utils/history"
import { useLocalStorage } from "./useLocalStorage"

export type UseSelectedSchoolOpts = {
	ifNoneThenUseLastSelected?: boolean;
}

export const useSelectedSchool = ({
	ifNoneThenUseLastSelected = true,
}: UseSelectedSchoolOpts = {}): string | null => {
	const [school, setSchool] = useState(parseSelectedSchoolFromURL())
	const [lastSelectedSchool, setLastSelectedSchool] = useLocalStorage<string>("turbo-schedule.last-selected-school", "");

	useEffect(() => {
		if (school) {
			setLastSelectedSchool(school)
		}

		history.listen((location, _action) => {
			const newSchool = parseSelectedSchoolFromURL(location)
			// console.log({school, newSchool, location});

			if (school !== newSchool) {
				setSchool(newSchool)
			}

			if (school) {
				setLastSelectedSchool(school)
			}
		})
	}, [school, setLastSelectedSchool])

	if (!school && ifNoneThenUseLastSelected) {
		return lastSelectedSchool
	}

	return school
}

export const parseSelectedSchoolFromURL = (location: Location = history.location): string | null => {
	const paths: string[] = location.pathname.split("/").slice(1)
	if (paths.length === 0) {
		return null
	}

	return paths[0]
}

export function navigateToSchool(id: string): void {
	history.push(`/${id}`)
}

export const LANDING_NO_AUTO_SWITCH_TO_SCHOOL = "noswitch";

export function useAutoSwitchToLastSelectedSchool() {
	const school = useSelectedSchool()

	useEffect(() => {
		const noswitch: boolean = new URLSearchParams(history.location.search).has(LANDING_NO_AUTO_SWITCH_TO_SCHOOL);
		if (school && !noswitch) {
			navigateToSchool(school);
		}
	}, [school]);
}
