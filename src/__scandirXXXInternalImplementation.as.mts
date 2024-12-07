import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import type {InternalScandirOptions} from "#~synthetic/async.sync/InternalScandirOptions.d.mts"
//>import type {InternalScandirSyncOptions as InternalScandirOptions} from "#~synthetic/async.sync/InternalScandirSyncOptions.d.mts"

import type {AnioJsDependencies} from "#~synthetic/async.sync/Dependencies.d.mts"
//>import type {AnioJsDependencies} from "#~synthetic/async.sync/DependenciesSync.d.mts"

import type {PathType} from "@aniojs/node-path-type"
import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"

import {readdir, realpath} from "@aniojs-private/node-async-sync-fs/async"
//>import {readdir, realpath} from "@aniojs-private/node-async-sync-fs/sync"

import path from "node:path"

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
	options : InternalScandirOptions,
	dependencies : AnioJsDependencies,
	result: (any[])|undefined
) {
	const {getTypeOfPath} = dependencies
	const entries = await readdir(
//>	const entries = readdir(
		path.join(root_dir, relative_entry_dir)
	)

	const normalized_root_dir = path.normalize(root_dir)

	for (const entry of entries) {
		const absolute_path = path.join(root_dir, relative_entry_dir, entry)
		const relative_path = path.join(relative_entry_dir, entry)

		const path_type = await getTypeOfPath(absolute_path)
//>		const path_type = getTypeOfPath(absolute_path)
	}
}

export async function implementation(
//>export function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	input_dir: string,
	options: InternalScandirOptions
) : Promise<any> {
//>) : any {
	const context = useContext(wrapped_context, 0)
	const returns_entries = !("callback" in options)

	context.log.trace(
		`Request scandir of path '${input_dir}' (mode=${(returns_entries ? "map" : "callback")}).`
	)

	//
	// if this flag is set, we don't care if the
	// folder "input_dir" does not exist.
	//
	if (options.allow_missing_dir === true) {
		const {getTypeOfPath} = dependencies

		const path_type = await getTypeOfPath(input_dir)
//>		const path_type = getTypeOfPath(input_dir)

		if (path_type === "nonExisting") {
			context.log.debug(
				`Scandir cant' find '${input_dir}', ignoring error since allow_missing_dir was set to 'true'.`
			)

			return returns_entries ? [] : undefined
		}
	}

	const resolved_input_dir = await realpath(input_dir)
//>	const resolved_input_dir = realpath(input_dir)

	let entries : (ScandirEntry[])|undefined = undefined

	if (returns_entries) entries = []

	await scandirImplementation(resolved_input_dir, ".", options, dependencies, entries)
//>	scandirImplementation(resolved_input_dir, ".", options, dependencies, entries)

	if (returns_entries) {
		// NB: only sort entries when map() wasn't specified
		if (options.sorted === true && typeof options.map !== "function") {
			(entries as ScandirEntry[]).sort((a, b) => {
				return a.relative_path.localeCompare(b.relative_path, "en")
			})
		}

		return entries
	}

	return undefined
}
