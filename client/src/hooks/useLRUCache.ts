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

		const _updatePersistedCache = useCallback(
			() =>
				/**
				 * here, internally, we should not pay attention to `newestOrOldest`
				 * and always use the `OldToNew` approach, since it's idempotent
				 *
				 * otherwise, if we used `NewToOld`, we'd be reversing the order each time,
				 * and you could refresh the page and see the order reversed each time
				 * from the previous time
				 */
				_setPersistedCache(cache.current.getAllOldToNew()),
			[_setPersistedCache]
		);

		/**
		 * restore from the _persistedCache on load.
		 * That's the whole reason we use the `_persistedCache` in the first place
		 */
		useEffect(() => {
			cache.current.addMany(_persistedCache);
			_updatePersistedCache();

			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		/**
		 * wrap the `add` functionality to make sure the internal persisted cache
		 * is always up to date.
		 */
		const add = useCallback(
			(val: T) => {
				cache.current.add(val);
				_updatePersistedCache();
			},
			[_updatePersistedCache]
		);

		return [newestOrOldest === "newest" ? cache.current.getAllNewToOld() : cache.current.getAllOldToNew(), add];
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
