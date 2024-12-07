import type {ScandirBaseOptions} from "#~synthetic/async.sync/export/ScandirBaseOptions.d.mts"
//>import type {ScandirSyncBaseOptions} from "#~synthetic/async.sync/export/ScandirSyncBaseOptions.d.mts"

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts";

type Callback = {
	(entry : ScandirEntry) : Promise<undefined> | undefined;
//>	(entry : ScandirEntry) : undefined;
}

export type __XX__ = ScandirBaseOptions & {
//>export type __XX__ = ScandirSyncBaseOptions & {
	callback: Callback
}
