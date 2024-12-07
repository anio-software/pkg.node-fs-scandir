import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {InternalScandirSyncOptions as InternalScandirOptions} from "#~synthetic/async.sync/InternalScandirSyncOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/DependenciesSync.d.mts"

import type {PathType} from "@aniojs/node-path-type"
import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"

import {readdir, realpath} from "@aniojs-private/node-async-sync-fs/sync"

export function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	input_dir: string,
	options: InternalScandirOptions
) : any {
	const context = useContext(wrapped_context, 0)
	const returns_entries = !("callback" in options)

	if (returns_entries) {
		context.log.trace(`scandir uses MAP`)
	} else {
		context.log.trace(`scandir uses CALLBACK`)
	}
}
