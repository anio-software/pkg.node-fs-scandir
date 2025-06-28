import type {ModeOfOperation} from "#~src/ModeOfOperation.ts"
import type {Ret as ScandirExtRet} from "#~src/scandirSyncExt.ts"
import type {ReturnMap} from "#~src/ReturnMap.ts"
import {createScandirEntryFromPathFactory} from "#~src/createScandirEntryFromPathFactory.ts"

export function getEmptyReturnValue<T extends ModeOfOperation>(
	mode: T,
	inputDir: string
): ReturnMap[T] {
	switch (mode) {
		case "scandir":
		case "scandirMapped": {
			return [] as any
		}

		case "scandirExt": {
			const ret: ScandirExtRet = {
				entries: [],
				createScandirEntryFromPath: createScandirEntryFromPathFactory(inputDir)
			}

			return ret as any
		}
	}

	return true as any
}
