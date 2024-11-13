import {scandirFactory as factory} from "#~auto/fourtune/export/scandirFactory.mts"

/* ImplementationDocType is needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#~auto/fourtune/async.sync/scandir/ImplementationDocType.d.mts"

const impl = factory()

export const scandir : ImplementationDocType = impl
