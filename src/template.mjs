import path from "node:path"

async function scandir(fs_object, root_dir, relative_entry_dir, options) {
	const entries = await fs_object.readdir(
		path.join(root_dir, relative_entry_dir)
	)

	for (const entry of entries) {
		const absolute_path = path.join(root_dir, relative_entry_dir, entry)
		const relative_path = path.join(relative_entry_dir, entry)
		const stats = await fs_object.lstat(absolute_path)

		let type = "file"

		if (stats.isSymbolicLink()) {
			type = "link"
		} else if (stats.isDirectory()) {
			type = "dir"
		}

		const handle_current_entry = async () => {
			const data = {type, relative_path, absolute_path}

			if (typeof options.callback === "function") {
				await options.callback(data)

				return
			}

			options.entries.push(data)
		}

		const recurse = async () => {
			if (type !== "dir") return

			await scandir(fs_object, root_dir, relative_path, options)
		}

		if (options.reverse === true) await recurse()

		await handle_current_entry()

		// written this way so "if statement" has same length as options.reverse === true
		if (options.reverse !== true) await recurse()
	}
}

export default async function(fs_object, root_dir, {
	callback = null,
	reverse = false
} = {}) {
	let entries = []
	const options = {callback, reverse, entries}
	const resolved_root_path = await fs_object.realpath(root_dir)

	await scandir(fs_object, resolved_root_path, ".", options)

	return typeof callback === "function" ? null : entries
}
