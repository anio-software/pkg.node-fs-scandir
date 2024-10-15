import type {UserContextType} from "@fourtune/realm-js"
import {useContext} from "@fourtune/realm-js"

import type {DependenciesType} from "#/auto/DependenciesSyncType.d.mts"

import implementation from "#/auto/implementationSync.mts"

/* needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#/auto/ImplementationSyncDocType.d.mts"

import {getTypeOfPathSyncFactory} from "@anio-fs/path-type"

/* ImplementationDocType is needed to make doctypes work in LSP */
export function scandirSyncFactory(user : UserContextType = {}) : ImplementationDocType {
	const context = useContext(user)

	const dependencies : DependenciesType = {
		getTypeOfPath: getTypeOfPathSyncFactory(user),
	}

	return function scandirSync(...args: Parameters<ImplementationDocType>) : ReturnType<ImplementationDocType> {
		return implementation(context, dependencies, ...args)
	}
}
