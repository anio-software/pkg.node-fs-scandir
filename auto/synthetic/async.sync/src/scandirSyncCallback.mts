import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {ScandirSyncCallbackOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncCallbackOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/DependenciesSync.d.mts"

import {implementation as scandirInternal} from "#~synthetic/async.sync/scandirSyncInternalImplementation.mts"

export type {AnioJsDependencies}

export function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	options: Options
) : undefined {
	scandirInternal(wrapped_context, dependencies, options)
}
