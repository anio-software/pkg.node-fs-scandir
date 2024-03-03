# @anio-node-foundation/fs-scandir

Read a directory recursively.

```js
import nodeFsScandir from "@anio-node-foundation/fs-scandir"

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
```
