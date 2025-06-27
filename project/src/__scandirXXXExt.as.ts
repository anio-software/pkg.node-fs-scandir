import type {EnkoreJSRuntimeContextOptions} from "@anio-software/enkore.js-runtime"

import type {__EnkoreFunctionDependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies} from "#~src/DependenciesSync.ts"

export type {__EnkoreFunctionDependencies}

import type {ScandirOptions as Options} from "#~export/ScandirOptions.ts"
//>import type {ScandirSyncOptions as Options} from "#~export/ScandirSyncOptions.ts"

import {internalImplementation as impl} from "#~src/internalImplementation.ts"
//>import {internalImplementationSync as impl} from "#~src/internalImplementationSync.ts"

import type {ScandirEntry} from "#~export/ScandirEntry.ts"

export type Ret = {
	entries: ScandirEntry[]
}

export async function __implementation(
//>export function __implementationSync(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: __EnkoreFunctionDependencies,
	options?: Options
): Promise<Ret> {
//>): Ret {
	return await impl(
//>	return impl(
		contextOptions,
		dependencies,
		"scandirExt",
		options
	)
}
