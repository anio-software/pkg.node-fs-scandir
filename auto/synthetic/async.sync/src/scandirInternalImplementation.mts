import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {InternalScandirOptions} from "#~synthetic/async.sync/InternalScandirOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/Dependencies.d.mts"

export async function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	input_dir: string,
	options: InternalScandirOptions
) : Promise<any> {
	const context = useContext(wrapped_context, 0)

	if ("map" in options) {
		context.log.trace(`scandir uses MAP`)
	} else if ("callback" in options) {
		context.log.trace(`scandir uses CALLBACK`)
	} else {
		throw new Error(`Invalid mode of operation detected.`)
	}
}
