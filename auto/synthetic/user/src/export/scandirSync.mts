import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {ScandirSyncOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncOptions.d.mts"
import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"
// ^^^--- types needed for implementation

import {scandirSyncFactory as factory} from "#~synthetic/user/export/scandirSyncFactory.mts"

let __fnImplementation: any = null

export function scandirSync<T>(input_dir: string, options?: Options) : ScandirEntry[] {
	if (__fnImplementation === null) __fnImplementation = factory(createContext());

	return __fnImplementation(input_dir, options)
}
