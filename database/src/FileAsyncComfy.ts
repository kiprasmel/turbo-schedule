// /**
//  * Stolen from https://github.com/typicode/lowdb/blob/44f9141b748f80af1107be8b90ac347b6ad02650/src/adapters/FileAsync.js
//  * & improved
//  */

// import fs from "fs-extra";
// import { AdapterOptions, BaseAdapter, AdapterAsyncComfy } from "lowdb";

// // Pretty stringify
// export function stringify<T = object>(obj: T) {
// 	return JSON.stringify(obj, null, 2);
// }

// class Options<SchemaT = any> implements AdapterOptions<SchemaT> {
// 	defaultValue?: SchemaT;
// 	serialize?: (data: SchemaT) => string;
// 	deserialize?: (serializedData: string) => SchemaT;
// }

// export class Base<SchemaT = any> extends Options implements BaseAdapter<SchemaT> {
// 	readonly "@@reference": SchemaT;
// 	source: string;

// 	defaultValue: SchemaT;
// 	serialize?: (data: SchemaT) => string;
// 	deserialize?: (serializedData: string) => SchemaT;
// 	// deserialize: (text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined) => SchemaT;

// 	// new<SchemaT = any>(source: string, options?: AdapterOptions<SchemaT> | undefined): BaseAdapter<SchemaT> {
// 	// 	return (this as unknown) as BaseAdapter<SchemaT>;
// 	// }

// 	// constructor(source: string, options?: AdapterOptions<SchemaT> | undefined) {
// 	constructor(
// 		source: string,
// 		options: AdapterOptions<SchemaT> | undefined = {
// 			defaultValue: {} as SchemaT,
// 			serialize: stringify,
// 			deserialize: JSON.parse,
// 		}
// 		//: AdapterOptions<SchemaT> | undefined = {
// 		// 	// defaultValue: {} as SchemaT,
// 		// 	// serialize: stringify,
// 		// 	// deserialize: JSON.parse,
// 		// }
// 	) {
// 		super();

// 		const { defaultValue, serialize, deserialize } = options;
// 		this.source = source;
// 		this.defaultValue = defaultValue!;
// 		this.serialize = serialize!;
// 		this.deserialize = deserialize!;

// 		return this;
// 	}
// }

// export class FileAsyncComfy<SchemaT = any> extends Base<SchemaT>
// 	implements AdapterAsyncComfy<SchemaT> /** implements BaseAdapter<SchemaT> */ {
// 	async read() {
// 		if (!(await fs.pathExists(this.source))) {
// 			// Initialize
// 			await fs.writeFile(this.source, this.serialize!(this.defaultValue)); /** TODO FIXME */
// 			return this.defaultValue;
// 		}

// 		try {
// 			// Read database
// 			const dataRaw = await fs.readFile(this.source, "utf-8");

// 			// Handle blank file
// 			const dataTrimmed = dataRaw.trim();
// 			const data = dataTrimmed ? this.deserialize!(dataTrimmed) /** TODO FIXME */ : this.defaultValue;

// 			return data;
// 		} catch (e) {
// 			if (e instanceof SyntaxError) {
// 				e.message = `Malformed JSON in file: ${this.source}\n${e.message}`;
// 			}
// 			throw e;
// 		}
// 	}

// 	async write(data: any): Promise<void> {
// 		return await fs.writeFile(this.source, this.serialize!(data)); /** TODO FIXME */
// 	}
// }

// // export interface LowdbAsync<SchemaT> extends LowdbBase<SchemaT>, ObjectChain<SchemaT> {
// // 	_: LoDashStatic;
// // 	read: () => Promise<this>;
// // 	/**
// // 	 * @description Be careful: This function overwrites the whole database.
// // 	 */
// // 	write<T = void>(returnValue?: T): T & Promise<T>;
// // }

// // export interface lowdb {
// // 	<AdapterT extends FileAsyncComfy>(adapter: AdapterT): FileAsyncComfy<AdapterT[ReferenceProperty]>;
// // }
