import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {InternalScandirSyncOptions as InternalScandirOptions} from "#~auto/InternalScandirSyncOptions.d.mts"

export function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	options: InternalScandirOptions
) : any {
	const context = useContext(wrapped_context, 0)
	
}
