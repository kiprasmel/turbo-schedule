export type List<T> = null | {
	prev: List<T>;
	next: List<T>;
	value: T;
};

export function LRUCache<T>(maxSizeIncl: number) {
	if (maxSizeIncl < 1) {
		throw new Error(`LRUCache: maxSizeIncl must be at least 1`);
	}

	// eslint-disable-next-line prefer-const
	let tail: List<T> = null;
	// eslint-disable-next-line prefer-const
	let head: List<T> = tail;

	const map: Map<T, List<T>> = new Map();

	let size: number = 0;

	function addMany(values: T[]): void {
		values.forEach(add);
	}

	function add(value: T): void {
		if (size >= maxSizeIncl) {
			removeByValueOrLRUPolicy(value);
			size--;
		}

		/**
		 * remove node if the value has already been stored
		 * since we'll add it, just at the end of the list
		 * as the most recently used one
		 *
		 */
		if (map.has(value)) {
			removeByValueOrLRUPolicy(value);
			size--;
		}

		const newNodeReference: List<T> = { prev: null, value, next: null };

		if (head === null) {
			head = newNodeReference;
			tail = head;
		} else {
			newNodeReference.prev = head;
			head.next = newNodeReference;
			head = head.next;
		}

		size++;

		map.set(value, newNodeReference);
	}

	function removeByValueOrLRUPolicy(value: T): void {
		let nodeReference: List<T>;

		if (!map.has(value)) {
			nodeReference = tail;
		} else {
			nodeReference = map.get(value)!;
		}

		if (nodeReference === undefined || nodeReference === null) {
			throw new Error(`LRUCache: nodeReference cannot be undefined (or null?) when deleting`);
		}

		const prevNodeRef = nodeReference.prev;
		const nextNodeRef = nodeReference.next;

		map.delete(value);

		if (prevNodeRef === null && nextNodeRef === null) {
			/** node to be deleted is the *only* node */
			tail = null;
			head = null;
		} else if (prevNodeRef === null) {
			/** node to be deleted is the *first* node */
			tail = nextNodeRef;

			/** typescript / eslint should infer this itself */
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			nextNodeRef!.prev = null;
		} else if (nextNodeRef === null) {
			/** node to be deleted is the *last* node */

			head = prevNodeRef;
			prevNodeRef.next = null;
		} else {
			prevNodeRef.next = nextNodeRef;
			nextNodeRef.prev = prevNodeRef;
		}
	}

	const getAllWithCacheFactory = (newestOrOldest: "newest" | "oldest"): (() => T[]) => {
		/**
		 * stores a reference to the (at the time) most recently added node
		 */
		let cacheKey: List<T>;
		let cache: T[] = [];
		/** check if the head node hasn't changed */
		const isCacheHit = (): boolean => cacheKey === head;

		return (): T[] => {
			if (isCacheHit()) {
				return cache;
			}

			const values: T[] = [];

			/**
			 * place these here instead of in the outter function
			 * to avoid creating a closure with stale `tail` & `head` values
			 */
			let [initialNode, nextOrPreviousAccessor] = ({
				newest: [head, "prev"], //
				oldest: [tail, "next"],
			} as const)[newestOrOldest];

			while (initialNode !== null) {
				values.push(initialNode.value);
				initialNode = initialNode[nextOrPreviousAccessor];
			}

			cacheKey = head;
			cache = values;

			return values;
		};
	};

	/**
	 * walk from *tail* to *head*
	 */
	const getAllOldToNew = getAllWithCacheFactory("oldest");

	/**
	 * walk from *head* to *tail*
	 */
	const getAllNewToOld = getAllWithCacheFactory("newest");

	const getTail = (): List<T> => tail;
	const getHead = (): List<T> => head;
	const getSize = (): number => size;
	const getMaxSize = (): number => maxSizeIncl;

	return {
		add,
		addMany,
		getAllOldToNew,
		getAllNewToOld,
		getTail,
		getHead,
		get: () => ({
			getAllOldToNew: getAllOldToNew(),
			getAllNewToOld: getAllNewToOld(),
			getTail: getTail(),
			getHead: getHead(),
			getSize: getSize(),
			getMaxSize: getMaxSize(),
		}),
	};
}
