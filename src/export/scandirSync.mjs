import factory from "../auto/export/scandirSyncFactory.mjs"

const impl = factory()

export default function scandirSync(...args) {
	return impl(...args)
}
