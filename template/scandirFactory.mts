import {readdir, lstat, realpath} from "@anio-fs/api/async"
import {getTypeOfPath} from "@anio-fs/path-type"
import {useContext} from "@fourtune/realm-js"
import type {ContextInstanceType} from "@fourtune/realm-js"
import path from "node:path"
import {PathType} from "@anio-fs/path-type"
import type {ScandirEntry} from "../../types.d.mts"

function parents(relative_path : string) : string[] {
	let parents = path.dirname(relative_path).split(path.sep)

	if (parents.length === 1 && parents[0] === ".") {
		return []
	}

	return parents
}

async function scandirImplementation(
	root_dir : string,
	relative_entry_dir : string,
	options : any
) : Promise<void> {
	const entries = await readdir(
		path.join(root_dir, relative_entry_dir)
	)

	for (const entry of entries) {
		const absolute_path = path.join(root_dir, relative_entry_dir, entry)
		const relative_path = path.join(relative_entry_dir, entry)
		const stats = await lstat(absolute_path)

		const path_type = await getTypeOfPath(absolute_path)

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
				const keep = await options.filter(data)

				if (keep !== true) return
			}

			if (typeof options.callback === "function") {
				await options.callback(data)

				return
			}

			if (typeof options.map === "function") {
				const {map} = options

				options.entries.push(await map(data))
			} else {
				options.entries.push(data)
			}
		}

		const recurse = async () => {
			if (path_type !== PathType.regularDir) return

			await scandirImplementation(root_dir, relative_path, options)
		}

		if (options.reverse === true) await recurse()

		await handle_current_entry()

		// written this way so "if statement" has same length as options.reverse === true
		if (options.reverse !== true) await recurse()
	}
}

async function scandirFrontend(root_dir : string, {
	allow_missing_dir = false,
	callback = null,
	reverse = false,
	sorted = false,
	filter = null,
	map = null
} = {}, context : ContextInstanceType) : Promise<ScandirEntry[]|null> {
	const return_entries = typeof callback !== "function"

	context.log.trace(
		`Request scandir of path '${root_dir}'.`
	)

	//
	// if this flag is set, we don't care if the
	// folder "root_dir" does not exist.
	//
	if (allow_missing_dir === true) {
		const path_type = await getTypeOfPath(root_dir)

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

	const resolved_root_path = await realpath(root_dir)

	await scandirImplementation(resolved_root_path, ".", options)

	if (sorted) {
		entries.sort((a, b) => {
			return a.relative_path.localeCompare(b.relative_path, "en")
		})
	}

	return return_entries ? entries : []
}

export default function scandirFactory(context_or_options = {}) {
	const context = useContext(context_or_options)

	return async function scandir(root_dir : string, options = {}) {
		return await scandirFrontend(root_dir, options, context)
	}
}
