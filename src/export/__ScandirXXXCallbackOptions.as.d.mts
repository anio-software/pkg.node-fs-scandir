import type {ScandirBaseOptions} from "#~auto/export/ScandirBaseOptions.d.mts"
//>import type {ScandirSyncBaseOptions} from "#~auto/export/ScandirSyncBaseOptions.d.mts"

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts";

type Callback = {
	(entry : ScandirEntry) : Promise<void> | void;
//>	(entry : ScandirEntry) : void & {then?: never};
}

export type __XX__ = ScandirBaseOptions & {
//>export type __XX__ = ScandirSyncBaseOptions & {
	callback: Callback
}
