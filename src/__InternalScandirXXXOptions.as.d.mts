import type {ScandirBaseOptions} from "#~synthetic/async.sync/export/ScandirBaseOptions.d.mts"
//>import type {ScandirSyncBaseOptions} from "#~synthetic/async.sync/export/ScandirSyncBaseOptions.d.mts"

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"

export type __XX__ = ScandirBaseOptions & {
//>export type __XX__ = ScandirSyncBaseOptions & {
	callback?: (e: ScandirEntry) => void
	map?: (e: ScandirEntry) => unknown
	sorted?: boolean
}
