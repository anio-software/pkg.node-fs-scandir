import type {EnkoreJSRuntimeContext} from "@anio-software/enkore.js-runtime"

import {validateInputOptions} from "#~src/validateInputOptions.ts"
//>import {validateSyncInputOptions as validateInputOptions} from "#~src/validateSyncInputOptions.ts"
import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"

import type {ModeOfOperation} from "#~src/ModeOfOperation.ts"

type Options = ReturnType<typeof validateInputOptions>

export type FunctionState = {
	context: EnkoreJSRuntimeContext
	dependencies: Dependencies

	modeOfOperation: ModeOfOperation

	normalizedInputDir: string
	resolvedInputDir: string
	userOptions: Options

	mutable: {
		currentDepth: number

		errors: Error[]
		errorHasOccurred: boolean

		stopLoopRequested: boolean
		stopRecursionRequested: boolean
		userDefinedReturnValue: boolean | undefined

		result: unknown[]
	}
}

export function createInitialMutableState(): FunctionState["mutable"] {
	return {
		currentDepth: 0,

		errors: [],
		errorHasOccurred: false,

		stopLoopRequested: false,
		stopRecursionRequested: false,
		userDefinedReturnValue: undefined,

		result: []
	}
}
