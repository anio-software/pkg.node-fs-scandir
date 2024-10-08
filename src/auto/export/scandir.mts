import type {ScandirEntry} from "../../ScandirEntry.d.mts"

import type {
	ScandirOptions
} from "../../types.d.mts"

import factory from "./scandirFactory.mts"

const fn = factory()

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
 * scandir will call this callback instead. Callback may be asynchronous.
 * 
 * "filter"
 * If this property is set, instructs scandir to filter entries based
 * on the return value of the function provided. Callback may be asynchronous.
 * 
 * "map"
 * If this property is set, maps the entries with the provided function. Callback may be asynchronous.
 * 
 * "reverse"
 * Sets the order in which scandir reports entries.
 * `true` means report directories before reporting files.
 * 
 * "sorted"
 * If set, sorts entries with `localCompare`.
 * This option has no effect if `callback` was specified.
 * 
 * "allow_missing_dir"
 * Allow entry directory path to not exist. Paths that are
 * broken symlinks or non directories (like files) don't count.
 * 
 * @return
 * Array of entries or `null` if `callback` option was provided.
 */
export default async function(path : string, options? : ScandirOptions) : Promise<ScandirEntry[]|null> {
	return await fn(path, options)
}
