import {
	type EnkoreJSRuntimeContextOptions,
	createContext,
	type EnkoreJSRuntimeContext
} from "@anio-software/enkore.js-runtime"

import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"
import type {AllOptions} from "#~src/getOptions.ts"
//>import type {AllOptions} from "#~src/getOptionsSync.ts"
import {validateInputOptions} from "#~src/validateInputOptions.ts"
//>import {validateSyncInputOptions as validateInputOptions} from "#~src/validateSyncInputOptions.ts"
import {readdir, realpath} from "@anio-software/pkg-private.node-consistent-fs/async"
//>import {readdir, realpath} from "@anio-software/pkg-private.node-consistent-fs/sync"

import type {ModeOfOperation} from "#~src/ModeOfOperation.ts"
import type {ScandirEntry} from "#~export/ScandirEntry.ts"
import type {ReturnMap} from "#~src/ReturnMap.ts"
import type {Ret as ScandirExtRet} from "#~src/scandirSyncExt.ts"
import type {ValidPathType} from "@anio-software/pkg.node-fs-path-type"
import type {Stop} from "#~src/Stop.ts"
import {getEmptyReturnValue} from "#~src/getEmptyReturnValue.ts"
import {parents} from "#~src/parents.ts"
import {isFunction, isString, isNumber, isBoolean, isUndefined} from "@anio-software/pkg.is"
import {createScandirEntryFromPathFactory} from "#~src/createScandirEntryFromPathFactory.ts"
import {getOrCreateError} from "@anio-software/pkg.js-utils"
import path from "node:path"

type Options = ReturnType<typeof validateInputOptions>

// keeps track of additional state such as
// has an error occurred or the errors that have occurred (depending on the mode)
type AdditionalState = {
	modeOfOperation: ModeOfOperation
	errorHasOccurred: boolean
	errors: Error[]
	// undefined means return success/failure
	userDefinedReturnValue: boolean|undefined
}

async function scandirImplementation(
//>function scandirImplementation(
	context: EnkoreJSRuntimeContext,
	normalizedInputDir: string,
	resolvedInputDir: string,
	relativeEntryDir: string,
	userOptions: Options,
	dependencies: Dependencies,
	result: (any[])|undefined,
	currentLevel: number,
	additionalState: AdditionalState
) {
	let stopRecursionRequested = false
	let stopLoopRequested = false

	const {options, type: optionsType} = userOptions
	const {getTypeOfPath} = dependencies
	const dirToRead = path.join(resolvedInputDir, relativeEntryDir)

}

function sortAscending(a: ScandirEntry, b: ScandirEntry) {
	return a.relativePath.localeCompare(b.relativePath, "en")
}

function sortDescending(a: ScandirEntry, b: ScandirEntry) {
	return b.relativePath.localeCompare(a.relativePath, "en")
}

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
	const options = validateInputOptions(modeOfOperation, userOptions)

	context.log.trace(
		`inputDir = '${inputDir}', modeOfOperation = '${modeOfOperation}', options.type = '${options.type}'`
	)

	if (options.options.allowMissingDir === true) {
		const {getTypeOfPath} = dependencies

		const pathType = await getTypeOfPath(inputDir)
//>		const pathType = getTypeOfPath(inputDir)

		if (pathType === "nonExisting") {
			context.log.debug(
				`Scandir can't find '${inputDir}', ignoring error since allowMissingDir was set to 'true'.`
			)

			return getEmptyReturnValue(modeOfOperation, inputDir)
		}
	}

	const resolvedInputDir = await realpath(inputDir)
//>	const resolvedInputDir = realpath(inputDir)

	const normalizedInputDir = path.normalize(inputDir)

	return {} as any
}
