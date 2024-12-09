import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {ScandirSyncBaseOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncBaseOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/DependenciesSync.d.mts"

import {implementation as scandirInternal} from "#~synthetic/async.sync/scandirSyncInternalImplementation.mts"

export type {AnioJsDependencies}

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"

export function implementation<T>(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	input_dir: string,
	options?: Options
) : ScandirEntry[] {
	if (typeof options === "undefined") {
		options = {}
	}

	return scandirInternal(wrapped_context, dependencies, input_dir, options)
}
