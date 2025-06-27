import type {EnkoreJSRuntimeContextOptions} from "@anio-software/enkore.js-runtime"

import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"

import type {ScandirOptions as Options} from "#~export/ScandirOptions.ts"
//>import type {ScandirSyncOptions as Options} from "#~export/ScandirSyncOptions.ts"

import {internalImplementation as impl} from "#~src/internalImplementation.ts"
//>import {internalImplementationSync as impl} from "#~src/internalImplementationSync.ts"

import type {ScandirEntry} from "#~export/ScandirEntry.ts"

export async function __implementation(
//>export function __implementationSync(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: Dependencies,
	options?: Options
): Promise<ScandirEntry[]> {
//>): ScandirEntry[] {
	const result = await impl(
//>	const result = impl(
		contextOptions,
		dependencies,
		"scandir",
		options
	)

	return []
}
