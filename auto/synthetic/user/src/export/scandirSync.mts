import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {ScandirSyncMappedOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncMappedOptions.d.mts"
// ^^^--- types needed for implementation

import {scandirSyncFactory as factory} from "#~synthetic/user/export/scandirSyncFactory.mts"

const fn = factory(createContext())

export function scandirSync<T>(options: Options<T>) : T[] {
	return fn(options)
}
