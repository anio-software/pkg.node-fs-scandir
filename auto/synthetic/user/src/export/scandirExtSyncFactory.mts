import {implementation, type AnioJsDependencies} from "#~synthetic/async.sync/scandirExtSync.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv dependencies declared via AnioJsDependencies type
import {getTypeOfPathSyncFactory} from "@aniojs/node-fs-path-type"
// ^^^ dependencies declared via AnioJsDependencies type

// vvv--- types needed for implementation
import type {ScandirSyncOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncOptions.d.mts"
import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"
// ^^^--- types needed for implementation

declare function scandirExtSync<T>(
	input_dir: string,
	options?: Options
) : {
	entries: ScandirEntry[]
	createScandirEntryFromPath: (filePath: string) => ScandirEntry
}

/**
 * @brief
 * Create an instance of the function 'scandirExtSync'.
 *
 * @param user
 * Options object (see @fourtune/realm-js/v0/runtime) or an already
 * created context with createContext().
 * This parameter is optional.
 *
 * @return
 * An instance of the function 'scandirExtSync'.
 */
export function scandirExtSyncFactory(context: RuntimeWrappedContextInstance) : typeof scandirExtSync {
	const dependencies : AnioJsDependencies = {
		getTypeOfPath: getTypeOfPathSyncFactory(context)
	}

	const project = getProject()
	const local_context : RuntimeWrappedContextInstance = {
		...context,
		_package: {
			name: project.package_json.name,
			version: project.package_json.version,
			author: project.package_json.author,
			license: project.package_json.license
		}
	}

	return function scandirExtSync<T>(input_dir: string, options?: Options) : {
	entries: ScandirEntry[]
	createScandirEntryFromPath: (filePath: string) => ScandirEntry
} {
		return implementation(local_context, dependencies, input_dir, options)
	}
}
