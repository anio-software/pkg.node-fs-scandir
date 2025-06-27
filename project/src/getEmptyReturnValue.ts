import type {ModeOfOperation} from "#~src/ModeOfOperation.ts"
import type {Ret as ScandirExtRet} from "#~src/scandirSyncExt.ts"
import type {ReturnMap} from "#~src/ReturnMap.ts"

export function getEmptyReturnValue<T extends ModeOfOperation>(
	mode: T
): ReturnMap[T] {
	switch (mode) {
		case "scandir":
		case "scandirMapped": {
			return [] as any
		}

		case "scandirExt": {
			const ret: ScandirExtRet = {
				entries: [],
				createScandirEntryFromPath(filePath) {
					return {} as any
				}
			}

			return ret as any
		}
	}

	return undefined as any
}
