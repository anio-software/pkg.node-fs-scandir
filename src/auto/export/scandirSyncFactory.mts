import {readdir, realpath} from "@anio-fs/api/sync"
import {getTypeOfPathSyncFactory as getTypeOfPathFactory} from "@anio-fs/path-type"
import {useContext} from "@fourtune/realm-js"
import type {FunctionTypeFromFactoryType, UsableContextType, ContextInstanceType} from "@fourtune/realm-js"
import path from "node:path"
import {PathType} from "@anio-fs/path-type"
import type {ScandirEntry, ScandirOptions} from "../../types.d.mts"
import fn from "./scandirSync.mts"

interface Dependencies {
	getTypeOfPath: FunctionTypeFromFactoryType<typeof getTypeOfPathFactory>
}

function parents(relative_path : string) : string[] {
	let parents = path.dirname(relative_path).split(path.sep)

	if (parents.length === 1 && parents[0] === ".") {
		return []
	}

	return parents
}

function scandirImplementation(
	root_dir : string,
	relative_entry_dir : string,
	options : any,
	dependencies : Dependencies
) : void {
	const {getTypeOfPath} = dependencies
	const entries = readdir(
		path.join(root_dir, relative_entry_dir)
	)

	for (const entry of entries) {
		const absolute_path = path.join(root_dir, relative_entry_dir, entry)
		const relative_path = path.join(relative_entry_dir, entry)

		const path_type = getTypeOfPath(absolute_path)

		const handle_current_entry = async () => {
			const data : ScandirEntry = {
				type: path_type,
				parents: parents(relative_path),
				name: entry,
				path: path.join(
					options.n_root_dir, relative_path
				),
				relative_path,
				absolute_path
			}

			if (typeof options.filter === "function") {
				const keep = options.filter(data)

				if (keep !== true) return
			}

			if (typeof options.callback === "function") {
				options.callback(data)

				return
			}

			if (typeof options.map === "function") {
				const {map} = options

				options.entries.push(map(data))
			} else {
				options.entries.push(data)
			}
		}

		const recurse = () => {
			if (path_type !== PathType.regularDir) return

			scandirImplementation(root_dir, relative_path, options, dependencies)
		}

		if (options.reverse === true) recurse()

		handle_current_entry()

		// written this way so "if statement" has same length as options.reverse === true
		if (options.reverse !== true) recurse()
	}
}

function scandirFrontend(root_dir : string, {
	allow_missing_dir = false,
	callback = null,
	reverse = false,
	sorted = false,
	filter = null,
	map = null
} : ScandirOptions = {}, context : ContextInstanceType, dependencies : Dependencies) : ScandirEntry[]|null {
	const {getTypeOfPath} = dependencies

	const return_entries = typeof callback !== "function"

	context.log.trace(
		`Request scandir of path '${root_dir}'.`
	)

	//
	// if this flag is set, we don't care if the
	// folder "root_dir" does not exist.
	//
	if (allow_missing_dir === true) {
		const path_type = getTypeOfPath(root_dir)

		if (path_type === PathType.nonExisting) {
			context.log.debug(
				`Scandir cant' find '${root_dir}', ignoring error since allow_missing_dir was set to 'true'.`
			)

			return return_entries ? [] : null
		}
	}

	let entries : ScandirEntry[] = []

	const options = {
		n_root_dir: path.normalize(root_dir),
		callback,
		reverse,
		filter,
		map,
		entries
	}

	const resolved_root_path = realpath(root_dir)

	scandirImplementation(resolved_root_path, ".", options, dependencies)

	if (sorted) {
		entries.sort((a, b) => {
			return a.relative_path.localeCompare(b.relative_path, "en")
		})
	}

	return return_entries ? entries : []
}

export default function(context_or_options : UsableContextType = {}) : typeof fn {
	const context = useContext(context_or_options)

	const dependencies : Dependencies = {
		getTypeOfPath: getTypeOfPathFactory(context_or_options)
	}

	return function scandirSync(root_dir : string, options : ScandirOptions = {}) : ReturnType<typeof fn> {
		return scandirFrontend(root_dir, options, context, dependencies)
	}
}
