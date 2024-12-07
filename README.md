# @aniojs/node-fs-scandir

Read a directory recursively.

```js
import {scandir, scandirSync} from "@aniojs/node-fs-scandir"

/*
  {
    type: 'regularFile',
    parents: [],
    name: 'example.mjs',
    path: '/root/examples/example.mjs',
    relative_path: 'example.mjs',
    absolute_path: '/root/examples/example.mjs'
  }
*/

console.log(
	await scandir("examples")
)

console.log(
	scandirSync("examples")
)
```
