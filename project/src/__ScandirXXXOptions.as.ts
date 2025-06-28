import type {ScandirCommonOptions} from "#~src/ScandirCommonOptions.ts"
//>import type {ScandirSyncCommonOptions} from "#~src/ScandirSyncCommonOptions.ts"

export type __XX__ = ScandirCommonOptions & {
//>export type __XX__ = ScandirSyncCommonOptions & {
	/**
	 * @description
	 * Specifies whether returned array of entries should be sorted or not.
	 * The default is `false`.
	 */
	sort?: "alphabetical:ascending"  |
	       "alphabetical:descending" |
	       false

	/**
	 * @description
	 * Normally scandir() will re-throw errors that occur during directory traversal.
	 * We can stop this from happening by setting this flag to true.
	 * Note that this will ignore all errors.
	 * If more control over errors is desired, use scandirExt() instead.
	 */
	ignoreErrors?: boolean
}
