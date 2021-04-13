import { useRef, useCallback, useEffect } from "react";

import { Participant, LRUCache } from "@turbo-schedule/common";

import { useLocalStorage } from "./useLocalStorage";

export function createUsePersistedLRUCache<T = unknown>(
	key: string, //
	maxSizeIncl: number,
	newestOrOldest: "newest" | "oldest" = "newest"
) {
	return function usePersistedLRUCache(): [T[], (value: T) => void] {
		const cache = useRef(LRUCache<T>(maxSizeIncl));

		const [_persistedCache, _setPersistedCache] = useLocalStorage<T[]>(key, []);

		useEffect(() => {
			cache.current.addMany(_persistedCache);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		const add = useCallback(
			(val: T) => {
				cache.current.add(val);

				_setPersistedCache(
					newestOrOldest === "newest" ? cache.current.getAllNewToOld() : cache.current.getAllOldToNew()
				);
			},
			[_setPersistedCache]
		);

		return [_persistedCache, add];
	};
}

const maxCacheSize: number = 100;

export const useMostRecentlyViewedParticipants = createUsePersistedLRUCache<Participant["text"]>(
	"turbo-schedule.most-recent-participants",
	maxCacheSize * 4
);

// export const useMostRecentlyViewedStudents = createUsePersistedLRUCache<Student["text"]>(
// 	"turbo-schedule.most-recent-students",
// 	maxCacheSize
// );
// export const useMostRecentlyViewedTeachers = createUsePersistedLRUCache<Teacher["text"]>(
// 	"turbo-schedule.most-recent-teachers",
// 	maxCacheSize
// );
// export const useMostRecentlyViewedClasses = createUsePersistedLRUCache<Class["text"]>(
// 	"turbo-schedule.most-recent-classes",
// 	maxCacheSize
// );
// export const useMostRecentlyViewedRooms = createUsePersistedLRUCache<Room["text"]>(
// 	"turbo-schedule.most-recent-rooms",
// 	maxCacheSize
// );
