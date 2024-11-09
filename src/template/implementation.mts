/* -------- required imports by template -------- */
import type {ContextInstance} from "@fourtune/realm-js/v0/runtime"
import type {DependenciesType} from "#~auto/DependenciesType.d.mts"
//>import type {DependenciesType} from "#~auto/DependenciesSyncType.d.mts"

import type {ImplementationDocType} from "#~auto/ImplementationDocType.d.mts"
//>import type {ImplementationDocType} from "#~auto/ImplementationSyncDocType.d.mts"
/* -------- required imports by template -------- */

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"

import type {ScandirOptions} from "#~auto/export/ScandirOptions.d.mts"
//>import type {ScandirSyncOptions} from "#~auto/export/ScandirSyncOptions.d.mts"

import path from "node:path"
import type {PathType} from "@anio-fs/path-type"

import {readdir, realpath} from "@anio-fs/api/async"
//>import {readdir, realpath} from "@anio-fs/api/sync"

function parents(relative_path : string) : string[] {
	let parents = path.dirname(relative_path).split(path.sep)

	if (parents.length === 1 && parents[0] === ".") {
		return []
	}

	return parents
}

async function scandirImplementation(
//>function scandirImplementation(
	root_dir : string,
	relative_entry_dir : string,
	options : any,
	dependencies : DependenciesType
) : Promise<void> {
//>) : void {
	const {getTypeOfPath} = dependencies
	const entries = await readdir(
//>	const entries = readdir(
		path.join(root_dir, relative_entry_dir)
	)

	for (const entry of entries) {
		const absolute_path = path.join(root_dir, relative_entry_dir, entry)
		const relative_path = path.join(relative_entry_dir, entry)

		const path_type = await getTypeOfPath(absolute_path)
//>		const path_type = getTypeOfPath(absolute_path)

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
//>				const keep = options.filter(data)

				if (keep !== true) return
			}

			if (typeof options.callback === "function") {
				await options.callback(data)
//>				options.callback(data)

				return
			}

			if (typeof options.map === "function") {
				const {map} = options

				options.entries.push(await map(data))
//>				options.entries.push(map(data))
			} else {
				options.entries.push(data)
			}
		}

		const recurse = async () => {
//>		const recurse = () => {
			if (path_type !== "regularDir") return

			await scandirImplementation(root_dir, relative_path, options, dependencies)
//>			scandirImplementation(root_dir, relative_path, options, dependencies)
		}

		if (options.reverse === true) await recurse()
//>		if (options.reverse === true) recurse()

		await handle_current_entry()
//>		handle_current_entry()

		// written this way so "if statement" has same length as options.reverse === true
		if (options.reverse !== true) await recurse()
//>		if (options.reverse !== true) recurse()
	}
}

async function scandirFrontend(root_dir : string, {
//>function scandirFrontend(root_dir : string, {
	allow_missing_dir = false,
	callback = null,
	reverse = false,
	sorted = false,
	filter = null,
	map = null
} : ScandirOptions = {}, context : ContextInstance, dependencies : DependenciesType) : Promise<ScandirEntry[]|null> {
//>} : ScandirSyncOptions = {}, context : ContextInstance, dependencies : DependenciesType) : ScandirEntry[]|null {
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
		const path_type = await getTypeOfPath(root_dir)
//>		const path_type = getTypeOfPath(root_dir)

		if (path_type === "nonExisting") {
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
//>	const resolved_root_path = realpath(root_dir)

	await scandirImplementation(resolved_root_path, ".", options, dependencies)
//>	scandirImplementation(resolved_root_path, ".", options, dependencies)

	if (sorted) {
		entries.sort((a, b) => {
			return a.relative_path.localeCompare(b.relative_path, "en")
		})
	}

	return return_entries ? entries : null
}

export default async function(
//>export default function(
	context : ContextInstance,
	dependencies : DependenciesType,
	/* add additional parameters here */
	path : string,
	options? : ScandirOptions
//>	options? : ScandirSyncOptions
) : ReturnType<ImplementationDocType> {

	return await scandirFrontend(path, options, context, dependencies)
//>	return scandirFrontend(path, options, context, dependencies)

}
