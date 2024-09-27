import factory from "../auto/export/scandirFactory.mjs"

const impl = factory()

export default async function scandir(...args) {
	return await impl(...args)
}
