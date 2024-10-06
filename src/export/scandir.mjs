import factory from "../auto/export/scandirFactory.mjs"

const impl = factory()

export default async function scandir(...args) {
	// @ts-ignore:next-line
	return await impl(...args)
}
