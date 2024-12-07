import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {ScandirMappedOptions as Options} from "#~synthetic/async.sync/export/ScandirMappedOptions.d.mts"
/* couldn't find the type 'Promise' at the top level */
// ^^^--- types needed for implementation

import {scandirFactory as factory} from "#~synthetic/user/export/scandirFactory.mts"

const fn = factory(createContext())

export async function scandir<T>(options: Options<T>) : Promise<T[]> {
	return await fn(options)
}
