import type {ScandirCommonOptions} from "#~src/ScandirCommonOptions.ts"
//>import type {ScandirSyncCommonOptions} from "#~src/ScandirSyncCommonOptions.ts"

import type {ScandirEntry} from "#~export/ScandirEntry.ts"

type Callback = {
	(entry: ScandirEntry): Promise<undefined> | undefined
//>	(entry: ScandirEntry): undefined
}

export type __XX__ = ScandirCommonOptions & {
//>export type __XX__ = ScandirSyncCommonOptions & {
	callback: Callback

	onError?: (e: Error) => Promise<undefined> | undefined
//>	onError?: (e: Error) => undefined
}
