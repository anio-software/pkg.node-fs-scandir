import type {MetaInformation} from "#~export/MetaInformation.ts"
import {lstat} from "@anio-software/pkg-private.node-consistent-fs/sync"

type Stats = ReturnType<typeof lstat>

export function nodeStatsToMetaObject(stats: Stats): MetaInformation {
	return {
		fileSize: stats.size,
		fileCreated: stats.birthtimeMs,
		fileModified: stats.mtimeMs,

		sticky: !!(stats.mode & 0o1000),
		sGID:   !!(stats.mode & 0o2000),
		sUID:   !!(stats.mode & 0o4000),

		rawMode: stats.mode,

		permissions: {
			mode: stats.mode & 0o777,
			owner: {
				user: stats.uid,
				group: stats.gid
			}
		}
	}
}
