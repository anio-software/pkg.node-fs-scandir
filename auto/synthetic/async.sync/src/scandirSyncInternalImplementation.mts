import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {InternalScandirSyncOptions as InternalScandirOptions} from "#~synthetic/async.sync/InternalScandirSyncOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/DependenciesSync.d.mts"

export function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	options: InternalScandirOptions
) : any {
	const context = useContext(wrapped_context, 0)

	if ("map" in options) {
		context.log.trace(`scandir uses MAP`)
	} else if ("callback" in options) {
		context.log.trace(`scandir uses CALLBACK`)
	} else {
		throw new Error(`Invalid mode of operation detected.`)
	}
}
