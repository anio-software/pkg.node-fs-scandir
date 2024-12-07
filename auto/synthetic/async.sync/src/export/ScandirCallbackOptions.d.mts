import type {ScandirBaseOptions} from "#~synthetic/async.sync/export/ScandirBaseOptions.d.mts"

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts";

type Callback = {
	(entry : ScandirEntry) : Promise<undefined> | undefined;
}

export type ScandirCallbackOptions = ScandirBaseOptions & {
	callback: Callback
}
