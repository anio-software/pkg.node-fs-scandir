import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {ScandirCallbackOptions as Options} from "#~synthetic/async.sync/export/ScandirCallbackOptions.d.mts"
/* couldn't find a user defined type named 'Promise' at the top level */
// ^^^--- types needed for implementation

import {scandirCallbackFactory as factory} from "#~synthetic/user/export/scandirCallbackFactory.mts"

let __fnImplementation: any = null

export async function scandirCallback(input_dir: string, options: Options) : Promise<undefined> {
	if (__fnImplementation === null) __fnImplementation = factory(createContext());

	return await __fnImplementation(input_dir, options)
}
