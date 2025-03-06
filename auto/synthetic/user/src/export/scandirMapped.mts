import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {ScandirMappedOptions as Options} from "#~synthetic/async.sync/export/ScandirMappedOptions.d.mts"
/* couldn't find a user defined type named 'Promise' at the top level */
// ^^^--- types needed for implementation

import {scandirMappedFactory as factory} from "#~synthetic/user/export/scandirMappedFactory.mts"

let __fnImplementation: any = null

export async function scandirMapped<T>(input_dir: string, options: Options<T>) : Promise<T[]> {
	if (__fnImplementation === null) __fnImplementation = factory(createContext());

	return await __fnImplementation(input_dir, options)
}
