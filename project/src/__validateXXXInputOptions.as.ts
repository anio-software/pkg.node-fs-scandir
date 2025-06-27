import type {ModeOfOperation} from "./ModeOfOperation.ts"
import {type AllOptions, getOptions} from "#~src/getOptions.ts"
//>import {type AllOptions, getOptions} from "#~src/getOptionsSync.ts"

export function __XX__(
	modeOfOperation: ModeOfOperation,
	userOptions: AllOptions|undefined
) {
	const ret = getOptions(userOptions)

	switch (modeOfOperation) {
		case "scandir":
		case "scandirExt": {
			if (ret.type !== "scandir") {
				throw new Error(`Invalid options object for mode '${modeOfOperation}'.`)
			}
		} break

		case "scandirCallback": {
			if (ret.type !== "scandirCallback") {
				throw new Error(`Invalid options object for mode '${modeOfOperation}'.`)
			}
		} break

		case "scandirMapped": {
			if (ret.type !== "scandirMapped") {
				throw new Error(`Invalid options object for mode '${modeOfOperation}'.`)
			}
		} break

		default: {
			throw new Error(`Invalid mode of operation '${modeOfOperation}'.`)
		}
	}

	return ret
}
