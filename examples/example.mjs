import {
	scandirFactory,
	scandirSyncFactory
} from "../dist/default/index.mjs"

import {createContext} from "@fourtune/realm-js/v0/runtime"

const context = createContext({
	shouldLog() {
		return true
	}
})

const scandir = scandirFactory(context)
const scandirSync = scandirSyncFactory(context)

/*
  {
    type: 'file',
    relative_path: 'example.mjs',
    absolute_path: '/some/path/example.mjs'
  }
*/

console.log(
	await scandir("examples")
)

console.log(
	scandirSync("examples")
)
