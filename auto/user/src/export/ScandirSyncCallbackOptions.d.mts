import type {ScandirSyncBaseOptions} from "#~auto/export/ScandirSyncBaseOptions.d.mts"

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts";

type Callback = {
	(entry : ScandirEntry) : void & {then?: never};
}

export type ScandirSyncCallbackOptions = ScandirSyncBaseOptions & {
	callback: Callback
}
