import {implementation, type AnioJsDependencies} from "#~synthetic/async.sync/scandirMapped.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv dependencies declared via AnioJsDependencies type
import {getTypeOfPathFactory} from "@aniojs/node-fs-path-type"
// ^^^ dependencies declared via AnioJsDependencies type

// vvv--- types needed for implementation
import type {ScandirMappedOptions as Options} from "#~synthetic/async.sync/export/ScandirMappedOptions.d.mts"
/* couldn't find the type 'Promise' at the top level */
// ^^^--- types needed for implementation

declare function scandir<T>(
	input_dir: string,
	options: Options<T>
) : Promise<T[]>

/**
 * @brief
 * Create an instance of the function 'scandir'.
 *
 * @param user
 * Options object (see @fourtune/realm-js/v0/runtime) or an already
 * created context with createContext().
 * This parameter is optional.
 *
 * @return
 * An instance of the function 'scandir'.
 */
export function scandirFactory(context: RuntimeWrappedContextInstance) : typeof scandir {
	const dependencies : AnioJsDependencies = {
		getTypeOfPath: getTypeOfPathFactory(context)
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

	return async function scandir<T>(input_dir: string, options: Options<T>) : Promise<T[]> {
		return await implementation(local_context, dependencies, input_dir, options)
	}
}
