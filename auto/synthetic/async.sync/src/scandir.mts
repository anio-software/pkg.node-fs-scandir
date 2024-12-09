import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {ScandirOptions as Options} from "#~synthetic/async.sync/export/ScandirOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/Dependencies.d.mts"

import {implementation as scandirInternal} from "#~synthetic/async.sync/scandirInternalImplementation.mts"

export type {AnioJsDependencies}

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"

export async function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	input_dir: string,
	options?: Options
) : Promise<ScandirEntry[]> {
	if (typeof options === "undefined") {
		options = {}
	}

	return await scandirInternal(wrapped_context, dependencies, input_dir, options)
}
