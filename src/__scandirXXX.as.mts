import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {ScandirOptions as Options} from "#~synthetic/async.sync/export/ScandirOptions.d.mts"
//>import type {ScandirSyncOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/Dependencies.d.mts"
//>import type {AnioJsDependencies} from "#~synthetic/async.sync/DependenciesSync.d.mts"

import {implementation as scandirInternal} from "#~synthetic/async.sync/scandirInternalImplementation.mts"
//>import {implementation as scandirInternal} from "#~synthetic/async.sync/scandirSyncInternalImplementation.mts"

export type {AnioJsDependencies}

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"

export async function implementation(
//>export function implementation<T>(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	input_dir: string,
	options?: Options
) : Promise<ScandirEntry[]> {
//>) : ScandirEntry[] {
	if (typeof options === "undefined") {
		options = {}
	}

	return await scandirInternal(wrapped_context, dependencies, input_dir, options)
//>	return scandirInternal(wrapped_context, dependencies, input_dir, options)
}
