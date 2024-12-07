import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {InternalScandirOptions} from "#~synthetic/async.sync/InternalScandirOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/Dependencies.d.mts"

export async function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	options: InternalScandirOptions
) : Promise<any> {
	const context = useContext(wrapped_context, 0)
	
}
