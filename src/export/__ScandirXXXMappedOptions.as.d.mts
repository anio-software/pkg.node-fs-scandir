import type {ScandirBaseOptions} from "#~auto/export/ScandirBaseOptions.d.mts"
//>import type {ScandirSyncBaseOptions} from "#~auto/export/ScandirSyncBaseOptions.d.mts"

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts";

type Map<T> = {
	(entry : ScandirEntry) : Promise<T> | T;
//>	(entry : ScandirEntry) : T & {then?: never};
}

export type ScandirMappedOptions<T> = ScandirBaseOptions & {
//>export type ScandirSyncMappedOptions<T> = ScandirSyncBaseOptions & {
	map: Map<T>
}
