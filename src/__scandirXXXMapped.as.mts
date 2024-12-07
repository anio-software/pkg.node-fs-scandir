import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {ScandirMappedOptions as Options} from "#~synthetic/async.sync/export/ScandirMappedOptions.d.mts"
//>import type {ScandirSyncMappedOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncMappedOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/Dependencies.d.mts"
//>import type {AnioJsDependencies} from "#~synthetic/async.sync/DependenciesSync.d.mts"

import {implementation as scandirInternal} from "#~synthetic/async.sync/scandirInternalImplementation.mts"
//>import {implementation as scandirInternal} from "#~synthetic/async.sync/scandirSyncInternalImplementation.mts"

export type {AnioJsDependencies}

export async function implementation<T>(
//>export function implementation<T>(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	input_dir: string,
	options?: Options<T>
) : Promise<T[]> {
//>) : T[] {
	if (typeof options === "undefined") {
		options = {}
	}

	return await scandirInternal(wrapped_context, dependencies, input_dir, options)
//>	return scandirInternal(wrapped_context, dependencies, input_dir, options)
}
