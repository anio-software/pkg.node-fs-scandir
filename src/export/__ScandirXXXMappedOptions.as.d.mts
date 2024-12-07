import type {ScandirBaseOptions} from "#~synthetic/async.sync/export/ScandirBaseOptions.d.mts"
//>import type {ScandirSyncBaseOptions} from "#~synthetic/async.sync/export/ScandirSyncBaseOptions.d.mts"

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts";

type Map<T> = {
	(entry : ScandirEntry) : Promise<T> | T;
//>	(entry : ScandirEntry) : T & {then?: never};
}

export type __XX__<T> = ScandirBaseOptions & {
//>export type __XX__<T> = ScandirSyncBaseOptions & {
	map: Map<T>
} | {
	map?: undefined

	/**
	 * @description
	 * Specifies whether returned array of entries should be sorted or not.
	 * The default is `false`.
	 */
	sorted? : boolean
}
