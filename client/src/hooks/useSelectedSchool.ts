import { useEffect, useState } from "react"
import { Location } from "history"

import { history } from "../utils/history"
import { useLocalStorage } from "./useLocalStorage"
import { CURRENTLY_SUPPORTED_SCHOOLS, SchoolID } from "pages/landing/Landing"

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

export const isSchool = (str: string): boolean => CURRENTLY_SUPPORTED_SCHOOLS.includes(str as SchoolID);

export const parseSelectedSchoolFromURL = (location: Location = history.location): string | null => {
	const paths: string[] = location.pathname.split("/").slice(1)
	if (paths.length === 0) {
		return null
	}

	const candidate = paths[0];

	if (!isSchool(candidate)) {
		/**
		 * TODO: further check if is not language or other stuff,
		 * and if indeed tried to select school, but is not supported,
		 * then show proper 404
		 */
		return null;
	}

	return candidate;
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
