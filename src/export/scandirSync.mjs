import factory from "../auto/export/scandirSyncFactory.mjs"

const impl = factory()

export default function scandirSync(...args) {
	// @ts-ignore:next-line
	return impl(...args)
}
