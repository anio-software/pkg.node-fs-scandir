import type {ScandirBaseOptions} from "#~synthetic/async.sync/export/ScandirBaseOptions.d.mts"

import type {ScandirEntry} from "#~src/export/ScandirEntry.d.mts"

export type InternalScandirOptions = ScandirBaseOptions & {
	callback?: (e: ScandirEntry) => void
	map?: (e: ScandirEntry) => unknown
}
