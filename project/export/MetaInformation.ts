import type {Permissions} from "./Permissions.ts"

export type MetaInformation = {
	fileSize: number
	fileCreated: number
	fileModified: number

	sticky: boolean
	sGID: boolean
	sUID: boolean

	rawMode: number

	permissions: Permissions
}
