import type {ScandirOptions as Options} from "#~export/ScandirOptions.ts"
//>import type {ScandirSyncOptions as Options} from "#~export/ScandirSyncOptions.ts"

import type {ScandirCallbackOptions as CallbackOptions} from "#~export/ScandirCallbackOptions.ts"
//>import type {ScandirSyncCallbackOptions as CallbackOptions} from "#~export/ScandirSyncCallbackOptions.ts"

import type {ScandirMappedOptions as MappedOptions} from "#~export/ScandirMappedOptions.ts"
//>import type {ScandirSyncMappedOptions as MappedOptions} from "#~export/ScandirSyncMappedOptions.ts"

import {isUndefined} from "@anio-software/pkg.is"

type AllOptions = Options | CallbackOptions | MappedOptions<unknown>

type Ret = {
	type: "scandir"
	options: Options
} | {
	type: "scandirCallback"
	options: CallbackOptions
} | {
	type: "scandirMapped"
	options: MappedOptions<unknown>
}

export function __XX__(userOptions: AllOptions|undefined): Ret {
	if (isUndefined(userOptions)) {
		return {
			type: "scandir",
			options: {}
		}
	}

	if ("callback" in userOptions) {
		return {
			type: "scandirCallback",
			options: userOptions as CallbackOptions
		}
	} else if ("map" in userOptions) {
		return {
			type: "scandirMapped",
			options: userOptions as MappedOptions<unknown>
		}
	}

	return {
		type: "scandir",
		options: userOptions as Options
	}
}
