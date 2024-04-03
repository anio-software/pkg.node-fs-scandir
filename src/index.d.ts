declare type ScandirEntryType = "dir" | "file" | "link"

declare type ScandirEntry = {
	/**
	 * @brief The type of the entry, can be "dir", "file" or "link".
	 */
	type : ScandirEntryType;
	/**
	 * @brief Absolute path to the entry.
	 */
	absolute_path : string;
	/**
	 * @brief Relative path to the entry.
	 */
	relative_path : string;
}

declare type ScandirOptions = {
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
	filter(entry : ScandirEntry) : bool;
	filter(entry : ScandirEntry) : Promise<bool>;

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

/**
 * @brief Asynchronously scan a directory.
 * @description
 * Asynchronously scans the directory located at `path`.
 * Returns all entries as an array if `callback` was not specified.
 * If `callback` was specified, this function will always return `null`.
 * @param path The directory to be scanned.
 * @param options The options parameter can contain the following properties:
 * 
 * "callback"
 * If this property is set, instead of returning an array of entries
 * scandir will call this callback instead.
 * Note: the specified function can be asynchronous.
 * 
 * "filter"
 * If this property is set, instructs scandir to filter entries based
 * on the return value of the function provided.
 * Note: the specified function can be asynchronous.
 * 
 * "reverse"
 * Sets the order in which scandir reports entries.
 * `true` means report directories before reporting files.
 * 
 * "sorted"
 * If set, sorts entries with `localCompare`.
 * This option has no effect if `callback` was specified.
 * 
 * @return
 * Array of entries or `null` if `callback` option was provided.
 */
export function scandir(path : string, options : ScandirOptions) : Promise<ScandirEntry[]>
export function scandir(path : string, options : ScandirOptions) : Promise<null>

/**
 * @brief Synchronously scan a directory.
 * @description
 * Synchronously scans the directory located at `path`.
 * Returns all entries as an array if `callback` was not specified.
 * If `callback` was specified, this function will always return `null`.
 * @param path The directory to be scanned.
 * @param options The options parameter can contain the following properties:
 * 
 * "callback"
 * If this property is set, instead of returning an array of entries
 * scandir will call this callback instead.
 * 
 * "filter"
 * If this property is set, instructs scandir to filter entries based
 * on the return value of the function provided.
 * 
 * "reverse"
 * Sets the order in which scandir reports entries.
 * `true` means report directories before reporting files.
 * 
 * "sorted"
 * If set, sorts entries with `localCompare`.
 * This option has no effect if `callback` was specified.
 * 
 * @return
 * Array of entries or `null` if `callback` option was provided.
 */
export function scandirSync(path : string, options : ScandirOptions) : ScandirEntry[]
export function scandirSync(path : string, options : ScandirOptions) : null
