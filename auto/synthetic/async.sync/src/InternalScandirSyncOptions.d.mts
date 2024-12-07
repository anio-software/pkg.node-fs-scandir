import type {ScandirSyncBaseOptions} from "#~synthetic/async.sync/export/ScandirSyncBaseOptions.d.mts"

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"

export type InternalScandirSyncOptions = ScandirSyncBaseOptions & {
	callback?: (e: ScandirEntry) => void
	map?: (e: ScandirEntry) => unknown
	sorted?: boolean
}
