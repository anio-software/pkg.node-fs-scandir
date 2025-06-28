export type MetaInformation = {
	fileSize: number

	sticky: boolean
	sGID: boolean
	sUID: boolean

	rawMode: number

	permissions: {
		mode: number

		owner: {
			user: number
			group: number
		}
	}
}
