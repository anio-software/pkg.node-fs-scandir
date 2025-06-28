export type Permissions = {
	sticky: boolean
	sGID: boolean
	sUID: boolean

	rawMode: number
	mode: number

	owner: {
		user: number
		group: number
	}
}
