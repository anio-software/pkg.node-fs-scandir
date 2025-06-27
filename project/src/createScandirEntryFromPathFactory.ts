import type {Ret as ScandirExtRet} from "#~src/scandirSyncExt.ts"

export function createScandirEntryFromPathFactory(
	inputDir: string
): ScandirExtRet["createScandirEntryFromPath"] {
	return function(filePath) {
		return {} as any
	}
}
