import type {ScandirCommonOptions} from "#~src/ScandirCommonOptions.ts"
//>import type {ScandirSyncCommonOptions} from "#~src/ScandirSyncCommonOptions.ts"

import type {ScandirEntry} from "#~export/ScandirEntry.ts"

type Stop = () => symbol

type Callback = {
	(entry: ScandirEntry, stop: Stop): Promise<undefined> | undefined | Promise<symbol> | symbol
//>	(entry: ScandirEntry, stop: Stop): undefined | symbol
}

export type __XX__ = ScandirCommonOptions & {
//>export type __XX__ = ScandirSyncCommonOptions & {
	callback: Callback

	onError?: (e: Error) => Promise<undefined> | undefined
//>	onError?: (e: Error) => undefined
}
