/* eslint-disable no-useless-constructor */

import { padLeft } from "./pad";
import { performanceNow } from "./performance.now";

export type Time = number;
export type OpVal = string | number | undefined;

export type Op<KO> = {
	time: Time;
	name: KO | (string & {});
	val?: OpVal;
};

export type Row<KO> = readonly [Op<KO>["name"], number, number, OpVal];
export type Cols = readonly [string, string, string, OpVal?];

export type OnRowDataCtx<KO> = {
	id: string;
	rows: Row<KO>[];
	cols: Cols;
	startTime: Time;
	endTime: Time;
	totalTime: Time;
	hasVal: boolean;
};
export type OnRowData<KO> = (ctx: OnRowDataCtx<KO>) => void;

export type PerfOpts<KO> = {
	onRowData?: OnRowData<KO>;
};

export type PerfEndOpts<KO> = {
	onRowData?: OnRowData<KO>;
};

export class _PerfOps<KnownOps extends string> {
	private ops: Op<KnownOps>[] = [];
	private hasOpVal: boolean = false;

	constructor() {
		//
	}

	trackAny(
		opname: KnownOps | (Op<KnownOps>["name"] & {}),
		opval?: Op<KnownOps>["val"]
	): void {
		const optime = _Perf.now();

		if (opval !== undefined) {
			this.hasOpVal = true;

			this.ops.push({
				name: opname,
				time: optime,
				val: opval
			});
		} else {
			this.ops.push({
				name: opname,
				time: optime
			});
		}
	}

	_getOps() {
		return this.ops;
	}

	_getHasOpValue() {
		return this.hasOpVal;
	}
}

/**
 * @usage
 *
 * ```ts
 * type KnownOps =
 *   | "init db"
 *   | "join x with y"
 *   | "send";
 *
 * export class MyPerf extends Perf<KnownOps> {};
 *
 * const perf = new MyPerf();
 *
 * perf.track("init db");
 * perf.track("join x with y");
 * perf.trackCustom("foo");
 * perf.trackAny("bar");
 * perf.trackAny("send");
 *
 * perf.trackEnd("send")
 * ```
 *
 */
export class _Perf<
	KnownOps extends string = string, //
	KnownIds extends string = string
> extends _PerfOps<KnownOps> {
	constructor(
		public id: KnownIds | (string & {}), //
		public opts: PerfOpts<KnownOps> = {
			onRowData: _Perf.defaultOnRowData //
		},
		public startTime: Time = _Perf.now(),
		public label: string = `${id}:${startTime}`
	) {
		super();
		this.trackAny(_Perf.START);
	}

	static START = "<start>";

	static now(): Time {
		return performanceNow();
	}

	/**
	 * track known
	 */
	track(opname: KnownOps, opval?: Op<KnownOps>["val"]): void {
		this.trackAny(opname, opval);
	}

	/**
	 * @param opname if `opname` is not allowed -- use `track` instead (it's a known op!)
	 * @note if need flexibility - use `trackAny`.
	 */
	trackCustom<T extends string>(
		opname: Exclude<T, KnownOps>,
		opval?: Op<KnownOps>["val"]
	): void {
		this.trackAny(opname, opval);
	}

	end(opname: KnownOps, endOpts: PerfEndOpts<KnownOps> = {}): void {
		this.track(opname);
		this._end(endOpts);
	}

	trackEndCustom<T extends string>(
		opname: Exclude<T, KnownOps>,
		endOpts: PerfEndOpts<KnownOps> = {}
	): void {
		this.trackCustom(opname);
		this._end(endOpts);
	}

	trackEndAny(
		opname: KnownOps | (string & {}),
		endOpts: PerfEndOpts<KnownOps> = {}
	): void {
		this.trackAny(opname);
		this._end(endOpts);
	}

	_end({
		onRowData = this.opts.onRowData //
	}: PerfEndOpts<KnownOps> = {}): void {
		const endTime = _Perf.now();
		const totalTime: Time = endTime - this.startTime;

		const rows: Row<KnownOps>[] = [];
		let prevTime = this.startTime;

		for (const op of this._getOps()) {
			const delta = op.time - prevTime;
			prevTime = op.time;

			const percent = (delta / totalTime) * 100;

			rows.push([
				op.name, //
				+delta.toFixed(4),
				+percent.toFixed(2),
				op.val
			]);
		}

		const hasVal: boolean = this._getHasOpValue();

		const cols: Cols = hasVal
			? ["opname", `+delta ms`, "delta %", "value"]
			: ["opname", `+delta ms`, "delta %"];

		onRowData?.({
			id: this.id,
			rows, //
			cols,
			startTime: this.startTime,
			endTime,
			totalTime,
			hasVal
		});
	}

	static defaultOnRowData: OnRowData<TBD> = ({
		rows,
		cols,
		totalTime,
		id,
		hasVal
	}) => {
		const longestOpname: Op<TBD>["name"] = rows.reduce<Op<TBD>["name"]>(
			(acc, r) => (r[0].length > acc.length ? r[0] : acc),
			""
		);

		const pad = padLeft(longestOpname);

		const rowObjs = rows.map(r => ({
			[cols[0]]: pad(r[0]),
			[cols[1]]: r[1],
			[cols[2]]: r[2],
			...(hasVal ? { [cols[3]!]: r[3] } : [])
		}));

		console.log("");
		console.table(rowObjs);
		console.log(id, +totalTime.toFixed(4), "ms", "\n");
	};
}

type TBD = string;
