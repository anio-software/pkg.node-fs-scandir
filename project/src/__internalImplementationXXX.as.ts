import {
	type EnkoreJSRuntimeContextOptions,
	createContext
} from "@anio-software/enkore.js-runtime"

import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"

import type {ModeOfOperation} from "#~src/ModeOfOperation.ts"

import {type AllOptions, getOptions} from "#~src/getOptions.ts"
//>import {type AllOptions, getOptions} from "#~src/getOptionsSync.ts"

export async function __XX__(
//>export function __XX__(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: Dependencies,
	modeOfOperation: ModeOfOperation,
	userOptions: AllOptions|undefined
): Promise<any> {
//>): any {
	const context = createContext(contextOptions, 0)
	const options = getOptions(userOptions)

	context.log.trace(
		`modeOfOperation = '${modeOfOperation}', options.type = '${options.type}'`
	)

	//
	// make sure options matches mode of operation
	//
	switch (modeOfOperation) {
		case "scandir":
		case "scandirExt": {
			if (options.type !== "scandir") {
				throw new Error(`Invalid options object for mode '${modeOfOperation}'.`)
			}
		} break

		case "scandirCallback": {
			if (options.type !== "scandirCallback") {
				throw new Error(`Invalid options object for mode '${modeOfOperation}'.`)
			}
		} break

		case "scandirMapped": {
			if (options.type !== "scandirMapped") {
				throw new Error(`Invalid options object for mode '${modeOfOperation}'.`)
			}
		} break

		default: {
			throw new Error(`Invalid mode of operation '${modeOfOperation}'.`)
		}
	}
}
