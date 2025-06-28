import type {getTypeOfPath} from "@anio-software/pkg.node-fs-path-type"
//>import type {getTypeOfPathSync} from "@anio-software/pkg.node-fs-path-type"

import type {getPathInformation} from "@anio-software/pkg.node-fs-stat-path"
//>import type {getPathInformationSync} from "@anio-software/pkg.node-fs-stat-path"

export type __EnkoreFunctionDependencies = {
	getTypeOfPath: typeof getTypeOfPath
//>	getTypeOfPath: typeof getTypeOfPathSync

	getPathInformation: typeof getPathInformation
//>	getPathInformation: typeof getPathInformationSync
}
