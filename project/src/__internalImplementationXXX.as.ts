import {
	type EnkoreJSRuntimeContextOptions,
	createContext
} from "@anio-software/enkore.js-runtime"

import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"

import type {ModeOfOperation} from "#~src/ModeOfOperation.ts"

import type {AllOptions} from "#~src/getOptions.ts"
//>import type {AllOptions} from "#~src/getOptionsSync.ts"

import type {ReturnMap} from "#~src/ReturnMap.ts"
import {getEmptyReturnValue} from "#~src/getEmptyReturnValue.ts"
import {validateInputOptions} from "#~src/validateInputOptions.ts"

import {realpath} from "@anio-software/pkg-private.node-consistent-fs/async"
//>import {realpath} from "@anio-software/pkg-private.node-consistent-fs/sync"

export async function __XX__<T extends ModeOfOperation>(
//>export function __XX__<T extends ModeOfOperation>(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: Dependencies,
	modeOfOperation: T,
	inputDir: string,
	userOptions: AllOptions|undefined
): Promise<ReturnMap[T]> {
//>): ReturnMap[T] {
	const context = createContext(contextOptions, 0)
	const {options, type: optionsType} = validateInputOptions(modeOfOperation, userOptions)

	context.log.trace(
		`inputDir = '${inputDir}', modeOfOperation = '${modeOfOperation}', options.type = '${optionsType}'`
	)

	if (options.allowMissingDir === true) {
		const {getTypeOfPath} = dependencies

		const pathType = await getTypeOfPath(inputDir)
//>		const pathType = getTypeOfPath(inputDir)

		if (pathType === "nonExisting") {
			context.log.debug(
				`Scandir can't find '${inputDir}', ignoring error since allowMissingDir was set to 'true'.`
			)

			return getEmptyReturnValue(modeOfOperation)
		}
	}

	const resolvedInputDir = await realpath(inputDir)
//>	const resolvedInputDir = realpath(inputDir)

	const entries: (unknown[])|undefined = (() => {
		if (modeOfOperation === "scandir" ||
		    modeOfOperation === "scandirMapped") {
			return []
		}

		return undefined
	})()

	// todo: call into recursive function

	return {} as any
}
