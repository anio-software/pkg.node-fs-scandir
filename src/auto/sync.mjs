import {readdir, lstat, realpath} from "@anio-fs/api/sync"
import path from "node:path"

function scandir(root_dir, relative_entry_dir, options) {
	const entries = readdir(
		path.join(root_dir, relative_entry_dir)
	)

	for (const entry of entries) {
		const absolute_path = path.join(root_dir, relative_entry_dir, entry)
		const relative_path = path.join(relative_entry_dir, entry)
		const stats = lstat(absolute_path)

		let type = "file"

		if (stats.isSymbolicLink()) {
			type = "link"
		} else if (stats.isDirectory()) {
			type = "dir"
		}

		const handle_current_entry = () => {
			const data = {
				type,
				relative_path,
				absolute_path,
				basename: entry
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
			if (type !== "dir") return

			scandir(root_dir, relative_path, options)
		}

		if (options.reverse === true) recurse()

		handle_current_entry()

		// written this way so "if statement" has same length as options.reverse === true
		if (options.reverse !== true) recurse()
	}
}

export default function(root_dir, {
	callback = null,
	reverse = false,
	sorted = false,
	filter = null,
	map = null
} = {}) {
	let entries = []
	const options = {callback, reverse, filter, map, entries}
	const resolved_root_path = realpath(root_dir)

	scandir(resolved_root_path, ".", options)

	if (sorted) {
		entries.sort((a, b) => {
			return a.relative_path.localeCompare(b.relative_path, "en")
		})
	}

	return typeof callback === "function" ? null : entries
}
