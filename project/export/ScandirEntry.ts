import type {ValidPathType} from "@anio-software/pkg.node-fs-path-type"

export type ScandirEntry = {
	/**
	 * @brief The type of the entry.
	 */
	type: ValidPathType

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
}
