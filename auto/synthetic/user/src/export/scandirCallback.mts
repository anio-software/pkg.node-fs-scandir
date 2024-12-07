import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {ScandirCallbackOptions as Options} from "#~synthetic/async.sync/export/ScandirCallbackOptions.d.mts"
/* couldn't find the type 'Promise' at the top level */
// ^^^--- types needed for implementation

import {scandirCallbackFactory as factory} from "#~synthetic/user/export/scandirCallbackFactory.mts"

const fn = factory(createContext())

export async function scandirCallback(options: Options) : Promise<undefined> {
	return await fn(options)
}
