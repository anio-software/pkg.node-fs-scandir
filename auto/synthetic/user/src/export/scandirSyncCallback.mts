import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {ScandirSyncCallbackOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncCallbackOptions.d.mts"
// ^^^--- types needed for implementation

import {scandirSyncCallbackFactory as factory} from "#~synthetic/user/export/scandirSyncCallbackFactory.mts"

const fn = factory(createContext())

export function scandirSyncCallback(options: Options) : undefined {
	return fn(options)
}
