# @aniojs/node-fs-scandir

Read a directory recursively.

```js
import {scandir, scandirSync} from "@aniojs/node-fs-scandir"

/*
  {
    type: 'file',
    parents: [],
    name: 'example.mjs',
    path: 'examples/example.mjs',
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
```
