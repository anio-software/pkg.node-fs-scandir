import {scandirFactory as factory} from "#~auto/export/scandirFactory.mts"

/* ImplementationDocType is needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#~auto/ImplementationDocType.d.mts"

const impl = factory()

export const scandir : ImplementationDocType = impl
