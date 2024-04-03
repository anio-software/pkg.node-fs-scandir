# @anio-fs/scandir

Read a directory recursively.

```js
import {scandir, scandirSync} from "@anio-fs/scandir"

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
```
