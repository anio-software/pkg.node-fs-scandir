import type {FunctionState} from "#~src/FunctionState.ts"
//>import type {FunctionState} from "#~src/FunctionStateSync.ts"

import type {ScandirEntry} from "#~export/ScandirEntry.ts"
import type {Stop} from "#~src/Stop.ts"
import {isFunction, isBoolean} from "@anio-software/pkg.is"

export async function processEntry(
//>export function processEntry(
	state: FunctionState,
	entry: ScandirEntry
) {
	const {context} = state
	const {options, type: optionsType} = state.userOptions

	if (isFunction(options.filter)) {
		const keep = await options.filter(entry)
//>		const keep = options.filter(entry)

		if (keep !== true) return
	}

	if (optionsType === "scandirCallback") {
		const stopRecursionSymbol = Symbol()
		const stopLoopSymbol = Symbol()
		const stopObject: Stop = {
			stopRecursion: () => stopRecursionSymbol,
			stopLoop: (returnValue) => {
				if (isBoolean(returnValue)) {
					state.mutable.userDefinedReturnValue = returnValue
				}

				return stopLoopSymbol
			}
		}

		const cbRet = await options.callback(entry, stopObject)
//>		const cbRet = options.callback(entry, stopObject)

		if (cbRet === stopRecursionSymbol) {
			context.log.debug(`recursion was requested to be stopped.`)

			state.mutable.stopRecursionRequested = true
		} else if (cbRet === stopLoopSymbol) {
			context.log.debug(`loop was requested to be stopped.`)

			state.mutable.stopLoopRequested = true
		}

		return
	}

	const {result} = state.mutable

	if (optionsType === "scandirMapped") {
		(result as any[]).push(await options.map(entry))
//>		(result as any[]).push(options.map(entry))
	} else {
		(result as any[]).push(entry)
	}
}
