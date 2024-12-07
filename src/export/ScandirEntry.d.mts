import type {PathType} from "@aniojs/node-path-type"

export type ScandirEntry = {
	/**
	 * @brief The type of the entry.
	 */
	type : PathType;
	/**
	 * @brief Normalized relative path to the entry joined with the initial root directory.
	 */
	path : string;
	/**
	 * @brief Absolute path to the entry.
	 */
	absolute_path : string;
	/**
	 * @brief Relative path to the entry.
	 */
	relative_path : string;
	/**
	 * @brief Basename of the entry.
	 */
	name : string;
	/**
	 * @brief Parent directories.
	 */
	parents: string[];
}
