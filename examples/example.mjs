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

console.log(scandir("project"))
console.log(scandirExt("project"))
console.log(scandirCallback("project", {
	callback(e) {
		console.log("got it", e)
	}
}))
console.log(scandirMapped("project", {
	map(e) {
		return e.type
	}
}))
