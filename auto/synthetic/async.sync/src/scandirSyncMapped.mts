import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {ScandirSyncMappedOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncMappedOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/DependenciesSync.d.mts"

import {implementation as scandirInternal} from "#~synthetic/async.sync/scandirSyncInternalImplementation.mts"

export type {AnioJsDependencies}

export function implementation<T>(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	options: Options<T>
) : T[] {
	return scandirInternal(wrapped_context, dependencies, options)
}
