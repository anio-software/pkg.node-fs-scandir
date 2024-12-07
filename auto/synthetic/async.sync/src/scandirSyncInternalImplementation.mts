import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {InternalScandirSyncOptions as InternalScandirOptions} from "#~synthetic/async.sync/InternalScandirSyncOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/DependenciesSync.d.mts"

export function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	input_dir: string,
	options: InternalScandirOptions
) : any {
	const context = useContext(wrapped_context, 0)

	if ("callback" in options) {
		context.log.trace(`scandir uses CALLBACK`)
	} else {
		context.log.trace(`scandir uses MAP`)
	}
}
