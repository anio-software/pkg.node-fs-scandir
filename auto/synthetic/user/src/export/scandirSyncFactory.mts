import {implementation, type AnioJsDependencies} from "#~synthetic/async.sync/scandirSyncMapped.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv dependencies declared via AnioJsDependencies type
import {getTypeOfPathSyncFactory} from "@aniojs/node-path-type"
// ^^^ dependencies declared via AnioJsDependencies type

// vvv--- types needed for implementation
import type {ScandirSyncMappedOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncMappedOptions.d.mts"
// ^^^--- types needed for implementation

declare function scandirSync<T>(
	input_dir: string,
	options: Options<T>
) : T[]

/**
 * @brief
 * Create an instance of the function 'scandirSync'.
 *
 * @param user
 * Options object (see @fourtune/realm-js/v0/runtime) or an already
 * created context with createContext().
 * This parameter is optional.
 *
 * @return
 * An instance of the function 'scandirSync'.
 */
export function scandirSyncFactory(context: RuntimeWrappedContextInstance) : typeof scandirSync {
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

	return function scandirSync<T>(input_dir: string, options: Options<T>) : T[] {
		return implementation(local_context, dependencies, input_dir, options)
	}
}
