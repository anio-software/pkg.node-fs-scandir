import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {ScandirSyncBaseOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncBaseOptions.d.mts"
import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"
// ^^^--- types needed for implementation

import {scandirSyncFactory as factory} from "#~synthetic/user/export/scandirSyncFactory.mts"

const fn = factory(createContext())

export function scandirSync<T>(input_dir: string, options?: Options) : ScandirEntry[] {
	return fn(input_dir, options)
}
