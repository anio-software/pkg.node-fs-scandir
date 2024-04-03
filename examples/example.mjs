import {scandir, scandirSync} from "../src/index.mjs"

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
