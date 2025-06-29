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
	const entries: string[] = await (async () => {
//>	const entries: string[] = (() => {
		const pathToRead = path.join(resolvedInputDir, relativeEntryDir)

		try {
			return await readdir(pathToRead)
//>			return readdir(pathToRead)
		} catch (_e) {
			const error = getOrCreateError(_e)

			context.log.warn(`caught exception '${error.message}' while trying to read '${pathToRead}'.`)

			additionalState.errorHasOccurred = true

			if (optionsType === "scandirCallback") {
				if (isFunction(options.onError)) {
					await options.onError(error)
//>					options.onError(error)
				}
			}
			// can't use "optionsType" here because it doesn't differentiate
			// between scandir() and scandirExt()
			else if (additionalState.modeOfOperation === "scandirExt") {
				additionalState.errors.push(error)
			}
			// re-throw error as is if mode of operation is "scandir"
			// note that is different from optionsType === "scandir"
			// which includes *both* scandir() and scandirExt()
			else if (additionalState.modeOfOperation === "scandir") {
				// ignoreErrors is not correctly inferred because we are checking
				// modeOfOperation instead of optionsType
				if ((options as any).ignoreErrors === true) {
					return []
				}

				throw _e
			}

			return []
		}
	})()

	for (const entry of entries) {
		const absolutePath = path.join(resolvedInputDir, relativeEntryDir, entry)
		const relativePath = path.join(relativeEntryDir, entry)

		const pathType: ValidPathType | "error" = await (async () => {
//>		const pathType: ValidPathType | "error" = (() => {
			const type = await getTypeOfPath(absolutePath)
//>			const type = getTypeOfPath(absolutePath)

			if (
			    type === "nonExisting" ||
			    type === "link:error"  ||
			    type === "error") {
				return "error"
			}

			return type
		})()

		if (pathType === "error") {
			context.log.warn(`path '${absolutePath}' has path type 'error'!`)
		}

		const handleCurrentEntry = async () => {
//>		const handleCurrentEntry = () => {
			const data: ScandirEntry = {
				pathType,
				type: pathType,
				parents: parents(relativePath),
				name: entry,
				path: path.join(
					normalizedInputDir, relativePath
				),
				relativePath,
				absolutePath
			}

			if (options.includePathInformation === true) {
				try {
					data.information = await dependencies.getPathInformation(absolutePath)
//>					data.information = dependencies.getPathInformation(absolutePath)
				} catch (_e) {
					const error = getOrCreateError(_e)

					context.log.warn(`caught exception '${error.message}' while trying to lstat() '${absolutePath}'.`)
				}
			}

			if (isFunction(options.filter)) {
				const keep = await options.filter(data)
//>				const keep = options.filter(data)

				if (keep !== true) return
			}

			if (optionsType === "scandirCallback") {
				const stopRecursionSymbol = Symbol()
				const stopLoopSymbol = Symbol()
				const stopObject: Stop = {
					stopRecursion: () => stopRecursionSymbol,
					stopLoop: (returnValue) => {
						if (isBoolean(returnValue)) {
							additionalState.userDefinedReturnValue = returnValue
						}

						return stopLoopSymbol
					}
				}

				const cbRet = await options.callback(data, stopObject)
//>				const cbRet = options.callback(data, stopObject)

				if (cbRet === stopRecursionSymbol) {
					context.log.debug(`recursion was requested to be stopped.`)

					stopRecursionRequested = true
				} else if (cbRet === stopLoopSymbol) {
					context.log.debug(`loop was requested to be stopped.`)

					stopLoopRequested = true
				}

				return
			}

			if (optionsType === "scandirMapped") {
				(result as any[]).push(await options.map(data))
//>				(result as any[]).push(options.map(data))
			} else {
				(result as any[]).push(data)
			}
		}

		const recurse = async () => {
//>		const recurse = () => {
			if (pathType !== "dir:regular") return

			if (stopRecursionRequested === true) {
				context.log.debug(`stopping recursion early due to user's request.`)

				return
			}

			const nextLevel = currentLevel + 1

			if (isNumber(options.maxDepth)) {
				if (nextLevel > options.maxDepth) {
					context.log.debug(`maxDepth '${options.maxDepth}' reached, stopping recursion at level '${currentLevel}'`)

					return
				}
			}

			await scandirImplementation(
//>			scandirImplementation(
				context,
				normalizedInputDir,
				resolvedInputDir,
				relativePath,
				userOptions,
				dependencies,
				result,
				nextLevel,
				additionalState
			)
		}

		if (options.reverse === true) await recurse()
//>		if (options.reverse === true) recurse()

		await handleCurrentEntry()
//>		handleCurrentEntry()

		// related issue https://github.com/microsoft/TypeScript/issues/58291
		if ((stopLoopRequested as any) === true) {
			context.log.debug(`stopping loop early due to user's request.`)

			break
		}

		// written this way so "if statement" has same length as options.reverse === true
		if (options.reverse !== true) await recurse()
//>		if (options.reverse !== true) recurse()
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

	const entries: (unknown[])|undefined = (() => {
		if (modeOfOperation === "scandir"    ||
		    modeOfOperation === "scandirExt" ||
		    modeOfOperation === "scandirMapped") {
			return []
		}

		return undefined
	})()

	const additionalState: AdditionalState = {
		modeOfOperation,
		errorHasOccurred: false,
		errors: [],
		userDefinedReturnValue: undefined
	}

	await scandirImplementation(
//>	scandirImplementation(
		context,
		normalizedInputDir,
		resolvedInputDir,
		".",
		options,
		dependencies,
		entries,
		0,
		additionalState
	)

	// this also catches the scandirExt case
	if (options.type === "scandir") {
		if (isString(options.options.sort)) {
			const sorter = options.options.sort === "alphabetical:ascending" ? sortAscending : sortDescending;

			(entries as ScandirEntry[]).sort(sorter)
		}
	}

	// scandir and scandirMapped both return the array of entries
	if (modeOfOperation === "scandir" || modeOfOperation === "scandirMapped") {
		return entries as any
	}
	// scandirExt returns an object
	else if (modeOfOperation === "scandirExt") {
		const ret: ScandirExtRet = {
			errors: additionalState.errors,
			entries: entries as any,
			createScandirEntryFromPath: createScandirEntryFromPathFactory(inputDir)
		}

		return ret as any
	}

	// user can overwrite default return value
	if (!isUndefined(additionalState.userDefinedReturnValue)) {
		context.log.trace(`returning user defined value '${additionalState.userDefinedReturnValue}'`)

		return additionalState.userDefinedReturnValue as any
	}

	// scandirCallback returns success
	return !additionalState.errorHasOccurred as any
}
