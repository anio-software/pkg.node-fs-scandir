import type {Ret as ScandirExtRet} from "#~src/scandirSyncExt.ts"
import path from "node:path"
import {parents} from "#~src/parents.ts"
import {realpathSync} from "@anio-software/pkg-private.node-consistent-fs/sync"

export function createScandirEntryFromPathFactory(
	inputDir: string
): ScandirExtRet["createScandirEntryFromPath"] {
	// todo: also support directories, not only files!
	return function(filePath) {
		const normalizedRootDir = path.normalize(inputDir)
		const normalizedFilePath = path.normalize(filePath)

		if (!normalizedFilePath.startsWith(normalizedRootDir)) {
			throw new Error(
				`Relative file path '${normalizedFilePath}' must start with '${normalizedRootDir}'.`
			)
		}

		const relativePath = path.relative(normalizedRootDir, normalizedFilePath)

		return {
			type: "file:regular",
			parents: parents(relativePath),
			name: path.basename(filePath),
			path: normalizedFilePath,
			relativePath,
			absolutePath: realpathSync(filePath)
		}
	}
}
