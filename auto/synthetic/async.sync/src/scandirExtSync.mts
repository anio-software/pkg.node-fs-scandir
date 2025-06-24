import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {ScandirSyncOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/DependenciesSync.d.mts"

import {implementation as scandirInternal} from "#~synthetic/async.sync/scandirSyncInternalImplementation.mts"

export type {AnioJsDependencies}

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"
import {parents} from "#~src/parents.mts"
import path from "node:path"
import {realpathSync} from "@aniojs-private/node-async-sync-fs"

export function implementation<T>(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	input_dir: string,
	options?: Options
): {
	entries: ScandirEntry[]
	createScandirEntryFromPath: (filePath: string) => ScandirEntry
} {
	if (typeof options === "undefined") {
		options = {}
	}

	const entries= scandirInternal(wrapped_context, dependencies, input_dir, options)

	if (typeof entries === "undefined") {
		throw new Error(
			`scandir returned undefined, this should never happen in this function.\n` +
			`Used options:\n${JSON.stringify(options, null, 2)}`
		)
	}

	return {
		entries,
		createScandirEntryFromPath(filePath) {
			const normalizedRootDir = path.normalize(input_dir)
			const normalizedFilePath = path.normalize(filePath)

			if (!normalizedFilePath.startsWith(normalizedRootDir)) {
				throw new Error(
					`Relative file path '${normalizedFilePath}' must start with '${normalizedRootDir}'.`
				)
			}

			const relativePath = path.relative(normalizedRootDir, normalizedFilePath)

			return {
				type: "regularFile",
				parents: parents(relativePath),
				name: path.basename(filePath),
				path: normalizedFilePath,
				relative_path: relativePath,
				absolute_path: realpathSync(filePath)
			}
		}
	}
}
