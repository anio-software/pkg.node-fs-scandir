import path from "node:path"

function scandir(fs_object, root_dir, relative_entry_dir, options) {
	const entries = fs_object.readdir(
		path.join(root_dir, relative_entry_dir)
	)

	for (const entry of entries) {
		const absolute_path = path.join(root_dir, relative_entry_dir, entry)
		const relative_path = path.join(relative_entry_dir, entry)
		const stats = fs_object.lstat(absolute_path)

		let type = "file"

		if (stats.isSymbolicLink()) {
			type = "link"
		} else if (stats.isDirectory()) {
			type = "dir"
		}

		const handle_current_entry = () => {
			const data = {type, relative_path, absolute_path}

			if (typeof options.filter === "function") {
				const keep = options.filter(data)

				if (keep !== true) return
			}

			if (typeof options.callback === "function") {
				options.callback(data)

				return
			}

			options.entries.push(data)
		}

		const recurse = () => {
			if (type !== "dir") return

			scandir(fs_object, root_dir, relative_path, options)
		}

		if (options.reverse === true) recurse()

		handle_current_entry()

		// written this way so "if statement" has same length as options.reverse === true
		if (options.reverse !== true) recurse()
	}
}

export default function(fs_object, root_dir, {
	callback = null,
	reverse = false,
	filter = null
} = {}) {
	let entries = []
	const options = {callback, reverse, filter, entries}
	const resolved_root_path = fs_object.realpath(root_dir)

	scandir(fs_object, resolved_root_path, ".", options)

	return typeof callback === "function" ? null : entries
}
