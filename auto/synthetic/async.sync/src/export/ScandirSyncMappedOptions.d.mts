import type {ScandirSyncBaseOptions} from "#~synthetic/async.sync/export/ScandirSyncBaseOptions.d.mts"

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts";

type Map<T> = {
	(entry : ScandirEntry) : T;
}

export type ScandirSyncMappedOptions<T> = ScandirSyncBaseOptions & ({
	map: Map<T>
} | {
	map?: undefined

	/**
	 * @description
	 * Specifies whether returned array of entries should be sorted or not.
	 * The default is `false`.
	 */
	sorted? : boolean
})
