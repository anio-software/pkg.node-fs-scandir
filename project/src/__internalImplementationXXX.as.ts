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
import {openDirectory, realpath} from "@anio-software/pkg-private.node-consistent-fs/async"
//>import {openDirectory, realpath} from "@anio-software/pkg-private.node-consistent-fs/sync"
import type {FunctionState} from "#~src/FunctionState.ts"
//>import type {FunctionState} from "#~src/FunctionStateSync.ts"

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

type DirHandle = Awaited<ReturnType<typeof openDirectory>>

async function scandirImplementation(
//>function scandirImplementation(
	state: FunctionState,
	relativeEntryDir: string
) {
	let stopRecursionRequested = false
	let stopLoopRequested = false

	const {context, dependencies} = state
	const {options, type: optionsType} = state.userOptions
	const dirToRead = path.join(state.resolvedInputDir, relativeEntryDir)

	let dirHandle: DirHandle|undefined = undefined

	try {
		dirHandle = await openDirectory(dirToRead)
//>		dirHandle = openDirectory(dirToRead)
	} catch (e) {
		handleError(e)
	}

	if (!dirHandle) return

	while (true) {
		try {
			const item = await dirHandle.read()
//>			const item = dirHandle.read()

			if (item === null) break

			const absolutePath = path.join(state.resolvedInputDir, relativeEntryDir, item.name)
			const relativePath = path.join(relativeEntryDir, item.name)

			const pathType = await getTypeOfPath(absolutePath)
//>			const pathType = getTypeOfPath(absolutePath)

			if (pathType === "error") {
				context.log.warn(`path '${absolutePath}' has path type 'error'!`)
			}

			const entry: ScandirEntry = {
				pathType,
				type: pathType,
				parents: parents(relativePath),
				name: item.name,
				path: path.join(state.normalizedInputDir, relativePath),
				relativePath,
				absolutePath
			}

			if (options.includePathInformation === true) {
				try {
					entry.information = await dependencies.getPathInformation(absolutePath)
//>					entry.information = dependencies.getPathInformation(absolutePath)
				} catch (e) {
					handleError(e)
				}
			}
		} catch (e) {
			handleError(e)

			break
		}
	}

	function handleError(e: unknown) {
		const error = getOrCreateError(e)

		context.log.warn(`caught exception '${error.message}'.`)
	}

	async function getTypeOfPath(path: string): Promise<ValidPathType | "error"> {
//>	function getTypeOfPath(path: string): ValidPathType | "error" {
		const type = await dependencies.getTypeOfPath(path)
//>		const type = dependencies.getTypeOfPath(path)

		if (
		    type === "nonExisting" ||
		    type === "link:error"  ||
		    type === "error") {
			return "error"
		}

		return type
	}
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

	const state: FunctionState = {
		context,
		dependencies,

		modeOfOperation,

		normalizedInputDir,
		resolvedInputDir,

		userOptions: options,

		mutable: {
			currentDepth: 0,

			errors: [],
			errorHasOccurred: false,

			userDefinedReturnValue: undefined,

			result: []
		}
	}

	await scandirImplementation(state, ".")
//>	scandirImplementation(state, ".")

	return {} as any
}
