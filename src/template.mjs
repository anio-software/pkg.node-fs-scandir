import {readdir, lstat, realpath} from "@anio-fs/api/async"
import path from "node:path"

async function scandir(root_dir, relative_entry_dir, options) {
	const entries = await readdir(
		path.join(root_dir, relative_entry_dir)
	)

	for (const entry of entries) {
		const absolute_path = path.join(root_dir, relative_entry_dir, entry)
		const relative_path = path.join(relative_entry_dir, entry)
		const stats = await lstat(absolute_path)

		let type = "file"

		if (stats.isSymbolicLink()) {
			type = "link"
		} else if (stats.isDirectory()) {
			type = "dir"
		}

		const handle_current_entry = async () => {
			const data = {
				type,
				relative_path,
				absolute_path,
				basename: entry
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
			if (type !== "dir") return

			await scandir(root_dir, relative_path, options)
		}

		if (options.reverse === true) await recurse()

		await handle_current_entry()

		// written this way so "if statement" has same length as options.reverse === true
		if (options.reverse !== true) await recurse()
	}
}

export default async function(root_dir, {
	callback = null,
	reverse = false,
	sorted = false,
	filter = null,
	map = null
} = {}) {
	let entries = []
	const options = {callback, reverse, filter, map, entries}
	const resolved_root_path = await realpath(root_dir)

	await scandir(resolved_root_path, ".", options)

	if (sorted) {
		entries.sort((a, b) => {
			return a.relative_path.localeCompare(b.relative_path, "en")
		})
	}

	return typeof callback === "function" ? null : entries
}
