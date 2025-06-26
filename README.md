# @anio-software/pkg.node-fs-scandir

Read a directory recursively.

```js
import {scandir, scandirSync} from "@anio-software/pkg.node-fs-scandir"

/*
  {
    type: 'regularFile',
    parents: [],
    name: 'example.mjs',
    path: '/root/examples/example.mjs',
    relativePath: 'example.mjs',
    absolutePath: '/root/examples/example.mjs'
  }
*/

console.log(
	await scandir("examples")
)

console.log(
	scandirSync("examples")
)
```
