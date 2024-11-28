import type {ScandirBaseOptions} from "#~auto/export/ScandirBaseOptions.d.mts"

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts";

type Callback = {
	(entry : ScandirEntry) : Promise<void> | void;
}

export type ScandirCallbackOptions = ScandirBaseOptions & {
	callback: Callback
}
