import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {InternalScandirOptions} from "#~auto/InternalScandirOptions.d.mts"

export async function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	options: InternalScandirOptions
) : Promise<any> {
	const context = useContext(wrapped_context, 0)
	
}
