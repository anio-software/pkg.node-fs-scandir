import path from "node:path"

export function parents(relativePath: string): string[] {
	let parents = path.dirname(relativePath).split(path.sep)

	if (parents.length === 1 && parents[0] === ".") {
		return []
	}

	return parents
}
