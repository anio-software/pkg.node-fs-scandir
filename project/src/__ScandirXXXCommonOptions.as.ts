import type {ScandirEntry} from "#~export/ScandirEntry.ts"

type Filter = {
	(entry: ScandirEntry): Promise<boolean> | boolean;
//>	(entry: ScandirEntry): boolean & {then?: never};
}

export type __XX__ = {
	/**
	 * @description
	 * The maximum depth of recursion.
	 * The default is unlimited, undefined means no limit.
	 */
	maxDepth?: number|undefined

	/**
	 * @description
	 * This option can be set to filter entries.
	 */
	filter?: Filter

	/**
	 * @description
	 * This flag controls whether to first report directories (default)
	 * or files.
	 */
	reverse?: boolean

	/**
	 * @description
	 * Specifies whether the entry path can be missing.
	 * The default is `false`.
	 */
	allowMissingDir?: boolean
}
