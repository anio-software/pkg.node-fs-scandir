import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {ScandirSyncOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncOptions.d.mts"
import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"
// ^^^--- types needed for implementation

import {scandirExtSyncFactory as factory} from "#~synthetic/user/export/scandirExtSyncFactory.mts"

export function scandirExtSync<T>(input_dir: string, options?: Options) : {
	entries: ScandirEntry[]
	createScandirEntryFromPath: (filePath: string) => ScandirEntry
} {
	const __fnImplementation = factory(createContext())

	return __fnImplementation(input_dir, options)
}
