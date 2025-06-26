import type {ScandirCommonOptions} from "#~src/ScandirCommonOptions.ts"
//>import type {ScandirSyncCommonOptions} from "#~src/ScandirSyncCommonOptions.ts"

import type {ScandirEntry} from "#~export/ScandirEntry.ts"

type Map<T> = {
	(entry: ScandirEntry): Promise<T> | T;
//>	(entry: ScandirEntry): T;
}

export type __XX__<T> = ScandirCommonOptions & {
//>export type __XX__<T> = ScandirSyncCommonOptions & {
	map: Map<T>
}
