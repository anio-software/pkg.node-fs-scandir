import {scandirSyncFactory as factory} from "#~auto/export/scandirSyncFactory.mts"

/* ImplementationDocType is needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#~auto/ImplementationSyncDocType.d.mts"

const impl = factory()

export const scandirSync : ImplementationDocType = impl
