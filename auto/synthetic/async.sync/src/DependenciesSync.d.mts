import {getTypeOfPathSync} from "@aniojs/node-fs-path-type"

export type AnioJsDependencies = {
	getTypeOfPath: typeof getTypeOfPathSync
}
