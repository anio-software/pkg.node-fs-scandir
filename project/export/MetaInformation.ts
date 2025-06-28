import type {Permissions} from "./Permissions.ts"

export type MetaInformation = {
	fileSize: number

	sticky: boolean
	sGID: boolean
	sUID: boolean

	rawMode: number

	permissions: Permissions
}
