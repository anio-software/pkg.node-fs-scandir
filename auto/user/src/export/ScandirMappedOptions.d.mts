import type {ScandirBaseOptions} from "#~auto/export/ScandirBaseOptions.d.mts"

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts";

type Map<T> = {
	(entry : ScandirEntry) : Promise<T> | T;
}

export type ScandirMappedOptions<T> = ScandirBaseOptions & {
	map: Map<T>
}
