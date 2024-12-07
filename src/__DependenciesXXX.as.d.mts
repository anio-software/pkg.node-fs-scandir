import {getTypeOfPath} from "@aniojs/node-path-type"
//>import {getTypeOfPathSync} from "@aniojs/node-path-type"

export type AnioJsDependencies = {
	getTypeOfPath: typeof getTypeOfPath
//>	getTypeOfPath: typeof getTypeOfPathSync
}
