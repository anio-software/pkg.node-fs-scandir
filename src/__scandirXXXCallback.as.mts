import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {ScandirCallbackOptions as Options} from "#~synthetic/async.sync/export/ScandirCallbackOptions.d.mts"
//>import type {ScandirSyncCallbackOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncCallbackOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/Dependencies.d.mts"
//>import type {AnioJsDependencies} from "#~synthetic/async.sync/DependenciesSync.d.mts"

import {implementation as scandirInternal} from "#~synthetic/async.sync/scandirInternalImplementation.mts"
//>import {implementation as scandirInternal} from "#~synthetic/async.sync/scandirSyncInternalImplementation.mts"

export type {AnioJsDependencies}

export async function implementation(
//>export function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	options: Options
) : Promise<undefined> {
//>) : undefined {
	await scandirInternal(wrapped_context, dependencies, options)
//>	scandirInternal(wrapped_context, dependencies, options)
}
