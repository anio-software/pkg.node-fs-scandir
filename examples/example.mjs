import scandirFactory from "../src/auto/export/scandirFactory.mjs"
import scandirSyncFactory from "../src/auto/export/scandirSyncFactory.mjs"

const scandir = scandirFactory()
const scandirSync = scandirSyncFactory()

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
