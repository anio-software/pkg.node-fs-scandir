import {
	scandirFactory,
	scandirSyncFactory
} from "../dist/default/index.mjs"

const options = {
	shouldLog() {
		return true
	}
}

const scandir = scandirFactory(options)
const scandirSync = scandirSyncFactory(options)

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
