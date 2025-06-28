import type {Ret as ScandirExtRet} from "#~src/scandirSyncExt.ts"
import type {ScandirEntry} from "#~export/ScandirEntry.ts"
import path from "node:path"
import {parents} from "#~src/parents.ts"
import {realpathSync} from "@anio-software/pkg-private.node-consistent-fs/sync"
import {getPathInformationSync} from "@anio-software/pkg.node-fs-stat-path"

export function createScandirEntryFromPathFactory(
	inputDir: string
): ScandirExtRet["createScandirEntryFromPath"] {
	// todo: also support directories, not only files!
	return function(filePath, includePathInformation) {
		if (!filePath.startsWith(inputDir)) {
			throw new Error(
				`Relative file path '${filePath}' must start with '${inputDir}'.`
			)
		}

		const normalizedRootDir = path.normalize(inputDir)
		const normalizedFilePath = path.normalize(filePath)

		const relativePath = path.relative(normalizedRootDir, normalizedFilePath)
		const absolutePath = realpathSync(filePath)

		const entry: ScandirEntry = {
			pathType: "file:regular",
			type: "file:regular",
			parents: parents(relativePath),
			name: path.basename(filePath),
			path: normalizedFilePath,
			relativePath,
			absolutePath
		}

		if (includePathInformation === true) {
			entry.information = getPathInformationSync(absolutePath)
		}

		return entry
	}
}
