import type {EnkoreJSRuntimeContextOptions} from "@anio-software/enkore.js-runtime"

import type {__EnkoreFunctionDependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies} from "#~src/DependenciesSync.ts"

export type {__EnkoreFunctionDependencies}

import type {ScandirMappedOptions as Options} from "#~export/ScandirMappedOptions.ts"
//>import type {ScandirSyncMappedOptions as Options} from "#~export/ScandirSyncMappedOptions.ts"

import {internalImplementation as impl} from "#~src/internalImplementation.ts"
//>import {internalImplementationSync as impl} from "#~src/internalImplementationSync.ts"

export async function __implementation<T>(
//>export function __implementationSync<T>(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: __EnkoreFunctionDependencies,
	options?: Options<T>
): Promise<T[]> {
//>): T[] {
	return await impl(
//>	return impl(
		contextOptions,
		dependencies,
		"scandirMapped",
		options
	) as any[]
}
