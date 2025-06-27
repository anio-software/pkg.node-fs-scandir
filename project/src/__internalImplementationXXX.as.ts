import {
	type EnkoreJSRuntimeContextOptions,
	createContext
} from "@anio-software/enkore.js-runtime"

import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"

import type {ModeOfOperation} from "#~src/ModeOfOperation.ts"

import {type AllOptions, getOptions} from "#~src/getOptions.ts"
//>import {type AllOptions, getOptions} from "#~src/getOptionsSync.ts"

import type {Ret as ScandirExtRet} from "#~src/scandirSyncExt.ts"
import type {ReturnMap} from "#~src/ReturnMap.ts"

function getEmptyReturnValue<T extends ModeOfOperation>(mode: T): ReturnMap[T] {
	switch (mode) {
		case "scandir":
		case "scandirMapped": {
			return [] as any
		}

		case "scandirExt": {
			const ret: ScandirExtRet = {
				entries: []
			}

			return ret as any
		}
	}

	return undefined as any
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
	const {options, type: optionsType} = getOptions(userOptions)

	context.log.trace(
		`inputDir = '${inputDir}', modeOfOperation = '${modeOfOperation}', options.type = '${optionsType}'`
	)

	//
	// make sure options matches mode of operation
	//
	switch (modeOfOperation) {
		case "scandir":
		case "scandirExt": {
			if (optionsType !== "scandir") {
				throw new Error(`Invalid options object for mode '${modeOfOperation}'.`)
			}
		} break

		case "scandirCallback": {
			if (optionsType !== "scandirCallback") {
				throw new Error(`Invalid options object for mode '${modeOfOperation}'.`)
			}
		} break

		case "scandirMapped": {
			if (optionsType !== "scandirMapped") {
				throw new Error(`Invalid options object for mode '${modeOfOperation}'.`)
			}
		} break

		default: {
			throw new Error(`Invalid mode of operation '${modeOfOperation}'.`)
		}
	}

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

	return {} as any
}
