import {implementation, type AnioJsDependencies} from "#~synthetic/async.sync/scandirSyncCallback.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv dependencies declared via AnioJsDependencies type
import {getTypeOfPathSyncFactory} from "@aniojs/node-path-type"
// ^^^ dependencies declared via AnioJsDependencies type

// vvv--- types needed for implementation
import type {ScandirSyncCallbackOptions as Options} from "#~synthetic/async.sync/export/ScandirSyncCallbackOptions.d.mts"
// ^^^--- types needed for implementation

declare function scandirSyncCallback(
	options: Options
) : undefined

/**
 * @brief
 * Create an instance of the function 'scandirSyncCallback'.
 *
 * @param user
 * Options object (see @fourtune/realm-js/v0/runtime) or an already
 * created context with createContext().
 * This parameter is optional.
 *
 * @return
 * An instance of the function 'scandirSyncCallback'.
 */
export function scandirSyncCallbackFactory(context: RuntimeWrappedContextInstance) : typeof scandirSyncCallback {
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

	return function scandirSyncCallback(options: Options) : undefined {
		return implementation(local_context, dependencies, options)
	}
}
