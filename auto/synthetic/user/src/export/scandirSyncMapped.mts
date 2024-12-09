import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {ScandirSyncMappedOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncMappedOptions.d.mts"
// ^^^--- types needed for implementation

import {scandirSyncMappedFactory as factory} from "#~synthetic/user/export/scandirSyncMappedFactory.mts"

const fn = factory(createContext())

export function scandirSyncMapped<T>(input_dir: string, options?: Options<T>) : T[] {
	return fn(input_dir, options)
}
