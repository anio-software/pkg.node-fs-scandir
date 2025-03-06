import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {ScandirSyncCallbackOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncCallbackOptions.d.mts"
// ^^^--- types needed for implementation

import {scandirSyncCallbackFactory as factory} from "#~synthetic/user/export/scandirSyncCallbackFactory.mts"

export function scandirSyncCallback(input_dir: string, options: Options) : undefined {
	const __fnImplementation = factory(createContext())

	return __fnImplementation(input_dir, options)
}
