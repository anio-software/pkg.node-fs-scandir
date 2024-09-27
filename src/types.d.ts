export type ScandirEntryType = "dir" | "file" | "link"

export type ScandirEntry = {
	/**
	 * @brief The type of the entry, can be "dir", "file" or "link".
	 */
	type : ScandirEntryType;
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
	parents: Array<string>;
}

export type ScandirOptions = {
	/**
	 * @description
	 * If this option is set, instead of returning all entries as
	 * an array, "callback" is called for every entry.
	 */
	callback(entry : ScandirEntry) : void;
	callback(entry : ScandirEntry) : Promise<void>;

	/**
	 * @description
	 * This option can be set to filter entries.
	 */
	filter(entry : ScandirEntry) : boolean;
	filter(entry : ScandirEntry) : Promise<boolean>;

	/**
	 * @description
	 * This option can be used to map entries.
	 */
	map(entry : ScandirEntry) : any;
	map(entry : ScandirEntry) : Promise<any>;

	/**
	 * @description
	 * This flag controls whether to first report directories (default)
	 * or files.
	 */
	reverse : boolean;

	/**
	 * @description
	 * Specifies whether returned array of entries should be sorted or not.
	 * The default is `false`.
	 */
	sorted : boolean;
}
