import type {EnkoreJSRuntimeContextOptions} from "@anio-software/enkore.js-runtime"

import type {__EnkoreFunctionDependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies} from "#~src/DependenciesSync.ts"

export type {__EnkoreFunctionDependencies}

import type {ScandirCallbackOptions as Options} from "#~export/ScandirCallbackOptions.ts"
//>import type {ScandirSyncCallbackOptions as Options} from "#~export/ScandirSyncCallbackOptions.ts"

import {internalImplementation as impl} from "#~src/internalImplementation.ts"
//>import {internalImplementationSync as impl} from "#~src/internalImplementationSync.ts"

export async function __implementation(
//>export function __implementationSync(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: __EnkoreFunctionDependencies,
	options?: Options
): Promise<undefined> {
//>): undefined {
	return await impl(
//>	return impl(
		contextOptions,
		dependencies,
		"scandirCallback",
		options
	)
}
