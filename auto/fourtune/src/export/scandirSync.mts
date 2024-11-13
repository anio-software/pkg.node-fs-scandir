import {scandirSyncFactory as factory} from "#~auto/fourtune/export/scandirSyncFactory.mts"

/* ImplementationDocType is needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#~auto/fourtune/async.sync/scandir/ImplementationSyncDocType.d.mts"

const impl = factory()

export const scandirSync : ImplementationDocType = impl
