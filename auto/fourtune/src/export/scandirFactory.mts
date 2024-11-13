import {
	getProjectPackageJSON,
	getFourtuneConfiguration
} from "@fourtune/realm-js/v0/project"

import type {UserContext} from "@fourtune/realm-js/v0/runtime"
import {useContext} from "@fourtune/realm-js/v0/runtime"

import type {DependenciesType} from "#~auto/fourtune/async.sync/scandir/DependenciesType.d.mts"

import implementation from "#~auto/fourtune/async.sync/scandir/implementation.mts"

/* needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#~auto/fourtune/async.sync/scandir/ImplementationDocType.d.mts"

import {getTypeOfPathFactory} from "@anio-fs/path-type"

/* ImplementationDocType is needed to make doctypes work in LSP */
export function scandirFactory(user : UserContext = {}) : ImplementationDocType {
	const project = {
		package_json: getProjectPackageJSON(),
		fourtune_configuration: getFourtuneConfiguration()
	}

	const context = useContext(project, user)

	const dependencies : DependenciesType = {
		getTypeOfPath: getTypeOfPathFactory(user),
	}

	return async function scandir(...args: Parameters<ImplementationDocType>) : ReturnType<ImplementationDocType> {
		return await implementation(context, dependencies, ...args)
	}
}
