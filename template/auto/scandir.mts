// Warning: this file was automatically created by fourtune vXXXXX
// You will find more information about the specific fourtune version used inside the file src/auto/VERSION.txt
// You should commit this file to source control
import {scandirFactory as factory} from "#/auto/export/scandirFactory.mts"
//import {scandirSyncFactory as factory} from "#/auto/export/scandirSyncFactory.mts"

/* ImplementationDocType is needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#/auto/export/_implementation.mts"
//import type {ImplementationDocType} from "#/auto/export/_implementationSync.mts"

const impl = factory()

export const scandir : ImplementationDocType = impl
//export const scandirSync : ImplementationDocType = impl
