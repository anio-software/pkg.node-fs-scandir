import type {PathType, ValidPathType} from "@anio-software/pkg.node-fs-path-type"

export type ScandirEntry = {
	/**
	 * @brief The path type as returned by getTypeOfPath
	 */
	pathType: PathType

	/**
	 * @brief The type of the entry.
	 */
	type: ValidPathType | "error"

	/**
	 * @brief Normalized relative path to the entry joined with the initial root directory.
	 */
	path: string

	/**
	 * @brief Absolute path to the entry.
	 */
	absolutePath: string

	/**
	 * @brief Relative path to the entry.
	 */
	relativePath: string

	/**
	 * @brief Basename of the entry.
	 */
	name: string

	/**
	 * @brief Parent directories.
	 */
	parents: string[]

	/**
	 * @brief Permissions.
	 */
	permissions?: {
		mode: number

		owner: {
			user: number
			group: number
		}
	} | undefined
}
