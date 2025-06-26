import type {ScandirBaseOptions} from "#~src/ScandirBaseOptions.ts"
//>import type {ScandirSyncBaseOptions} from "#~src/ScandirSyncBaseOptions.ts"

import type {ScandirEntry} from "#~export/ScandirEntry.ts"

type Callback = {
	(entry: ScandirEntry): Promise<undefined> | undefined
//>	(entry: ScandirEntry): undefined
}

export type __XX__ = ScandirBaseOptions & {
//>export type __XX__ = ScandirSyncBaseOptions & {
	callback: Callback
}
