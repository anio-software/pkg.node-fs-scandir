import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {ScandirMappedOptions as Options} from "#~synthetic/async.sync/export/ScandirMappedOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/Dependencies.d.mts"

import {implementation as scandirInternal} from "#~synthetic/async.sync/scandirInternalImplementation.mts"

export type {AnioJsDependencies}

export async function implementation<T>(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	input_dir: string,
	options: Options<T> = {}
) : Promise<T[]> {
	return await scandirInternal(wrapped_context, dependencies, input_dir, options)
}
