import nodeFsScandir from "../src/index.mjs"

/*
  {
    type: 'file',
    relative_path: 'example.mjs',
    absolute_path: '/some/path/example.mjs'
  }
*/

console.log(
	await nodeFsScandir("examples")
)

console.log(
	nodeFsScandir.sync("examples")
)
