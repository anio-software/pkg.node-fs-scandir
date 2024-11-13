import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts";

type Callback = {
	(entry : ScandirEntry) : void;
}

type Filter = {
	(entry : ScandirEntry) : boolean;
}

type Map = {
	(entry : ScandirEntry) : any;
}

export type ScandirSyncOptions = {
	/**
	 * @description
	 * If this option is set, instead of returning all entries as
	 * an array, "callback" is called for every entry.
	 */
	callback? : Callback | null

	/**
	 * @description
	 * This option can be set to filter entries.
	 */
	filter? : Filter | null

	/**
	 * @description
	 * This option can be used to map entries.
	 */
	map? : Map | null

	/**
	 * @description
	 * This flag controls whether to first report directories (default)
	 * or files.
	 */
	reverse? : boolean;

	/**
	 * @description
	 * Specifies whether returned array of entries should be sorted or not.
	 * The default is `false`.
	 */
	sorted? : boolean;

	/**
	 * @description
	 * Specifies whether the entry path can be missing.
	 * The default is `false`.
	 */
	allow_missing_dir? : boolean;
}
