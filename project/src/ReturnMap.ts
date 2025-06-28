import type {ScandirEntry} from "#~export/ScandirEntry.ts"
import type {Ret as ScandirExtRet} from "#~src/scandirSyncExt.ts"

export type ReturnMap = {
	"scandir": ScandirEntry[]
	"scandirExt": ScandirExtRet
	"scandirCallback": boolean
	"scandirMapped": unknown[]
}
