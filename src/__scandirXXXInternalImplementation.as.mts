import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {InternalScandirOptions} from "#~auto/InternalScandirOptions.d.mts"
//>import type {InternalScandirSyncOptions as InternalScandirOptions} from "#~auto/InternalScandirSyncOptions.d.mts"

export async function implementation(
//>export function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	options: InternalScandirOptions
) : Promise<any> {
//>) : any {
	const context = useContext(wrapped_context, 0)
	
}
