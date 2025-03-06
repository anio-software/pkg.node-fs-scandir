import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {ScandirSyncMappedOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncMappedOptions.d.mts"
// ^^^--- types needed for implementation

import {scandirSyncMappedFactory as factory} from "#~synthetic/user/export/scandirSyncMappedFactory.mts"

export function scandirSyncMapped<T>(input_dir: string, options: Options<T>) : T[] {
	const __fnImplementation = factory(createContext())

	return __fnImplementation(input_dir, options)
}
