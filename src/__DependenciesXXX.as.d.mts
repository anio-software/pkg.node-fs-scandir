import {getTypeOfPath} from "@aniojs/node-fs-path-type"
//>import {getTypeOfPathSync} from "@aniojs/node-fs-path-type"

export type AnioJsDependencies = {
	getTypeOfPath: typeof getTypeOfPath
//>	getTypeOfPath: typeof getTypeOfPathSync
}
