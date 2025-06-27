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
import {getEmptyReturnValue} from "#~src/getEmptyReturnValue.ts"
import type {ValidPathType} from "@anio-software/pkg.node-fs-path-type"
import path from "node:path"
import {parents} from "#~src/parents.ts"
import {isFunction} from "@anio-software/pkg.is"

type Options = ReturnType<typeof validateInputOptions>

async function scandirImplementation(
//>function scandirImplementation(
	context: EnkoreJSRuntimeContext,
	normalizedInputDir: string,
	resolvedInputDir: string,
	relativeEntryDir: string,
	userOptions: Options,
	dependencies: Dependencies,
	result: (any[])|undefined
) {
	const {options, type: optionsType} = userOptions

	const {getTypeOfPath} = dependencies
	const entries = await readdir(
//>	const entries = readdir(
		path.join(resolvedInputDir, relativeEntryDir)
	)

	for (const entry of entries) {
		const absolutePath = path.join(resolvedInputDir, relativeEntryDir, entry)
		const relativePath = path.join(relativeEntryDir, entry)

		const pathType = await getTypeOfPath(absolutePath)
//>		const pathType = getTypeOfPath(absolutePath)

		const handleCurrentEntry = async () => {
			const data: ScandirEntry = {
				type: pathType as ValidPathType,
				parents: parents(relativePath),
				name: entry,
				path: path.join(
					normalizedInputDir, relativePath
				),
				relativePath,
				absolutePath
			}

			if (isFunction(options.filter)) {
				const keep = await options.filter(data)
//>				const keep = options.filter(data)

				if (keep !== true) return
			}

			if (optionsType === "scandirCallback") {
				await options.callback(data)
//>				options.callback(data)

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

			await scandirImplementation(
//>			scandirImplementation(
				context,
				normalizedInputDir,
				resolvedInputDir,
				relativePath,
				userOptions,
				dependencies,
				result
			)
		}

		if (options.reverse === true) await recurse()
//>		if (options.reverse === true) recurse()

		await handleCurrentEntry()
//>		handleCurrentEntry()

		// written this way so "if statement" has same length as options.reverse === true
		if (options.reverse !== true) await recurse()
//>		if (options.reverse !== true) recurse()
	}
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

			return getEmptyReturnValue(modeOfOperation)
		}
	}

	const resolvedInputDir = await realpath(inputDir)
//>	const resolvedInputDir = realpath(inputDir)

	const normalizedInputDir = path.normalize(inputDir)

	const entries: (unknown[])|undefined = (() => {
		if (modeOfOperation === "scandir" ||
		    modeOfOperation === "scandirMapped") {
			return []
		}

		return undefined
	})()

	await scandirImplementation(
//>	scandirImplementation(
		context,
		normalizedInputDir,
		resolvedInputDir,
		".",
		options,
		dependencies,
		entries
	)

	return {} as any
}
