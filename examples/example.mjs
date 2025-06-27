import {
	scandirSyncFactory,
	scandirSyncExtFactory,
	scandirSyncCallbackFactory,
	scandirSyncMappedFactory
} from "../products/project/dist/default/index.mjs"
import {getProject} from "@anio-software/enkore.target-js-node/project"
import {defineContextOptions} from "@anio-software/enkore.js-runtime"

const options = defineContextOptions({
	project: getProject(),
	shouldLog() {
		return true
	}
})

const scandir = scandirSyncFactory(options)
const scandirExt = scandirSyncExtFactory(options)
const scandirCallback = scandirSyncCallbackFactory(options)
const scandirMapped = scandirSyncMappedFactory(options)

console.log(scandir("."))
console.log(scandirExt("."))
console.log(scandirCallback(".", {
	callback(e) {
		console.log("got it", e)
	}
}))
console.log(scandirMapped(".", {
	map(e) {
		return e.type
	}
}))
