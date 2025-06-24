import {implementation, type AnioJsDependencies} from "#~synthetic/async.sync/scandirExt.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv dependencies declared via AnioJsDependencies type
import {getTypeOfPathFactory} from "@aniojs/node-fs-path-type"
// ^^^ dependencies declared via AnioJsDependencies type

// vvv--- types needed for implementation
import type {ScandirOptions as Options} from "#~synthetic/async.sync/export/ScandirOptions.d.mts"
/* couldn't find a user defined type named 'Promise' at the top level */
import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"
// ^^^--- types needed for implementation

declare function scandirExt(
	input_dir: string,
	options?: Options
) : Promise<{
	entries: ScandirEntry[]
	createScandirEntryFromPath: (filePath: string) => ScandirEntry
}>

/**
 * @brief
 * Create an instance of the function 'scandirExt'.
 *
 * @param user
 * Options object (see @fourtune/realm-js/v0/runtime) or an already
 * created context with createContext().
 * This parameter is optional.
 *
 * @return
 * An instance of the function 'scandirExt'.
 */
export function scandirExtFactory(context: RuntimeWrappedContextInstance) : typeof scandirExt {
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

	return async function scandirExt(input_dir: string, options?: Options) : Promise<{
	entries: ScandirEntry[]
	createScandirEntryFromPath: (filePath: string) => ScandirEntry
}> {
		return await implementation(local_context, dependencies, input_dir, options)
	}
}
