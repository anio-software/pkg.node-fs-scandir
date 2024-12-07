import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {ScandirCallbackOptions as Options} from "#~synthetic/async.sync/export/ScandirCallbackOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/Dependencies.d.mts"

import {implementation as scandirInternal} from "#~synthetic/async.sync/scandirInternalImplementation.mts"

export type {AnioJsDependencies}

export async function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	options: Options
) : Promise<undefined> {
	await scandirInternal(wrapped_context, dependencies, options)
}
