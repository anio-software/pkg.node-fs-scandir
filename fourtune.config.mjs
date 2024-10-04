import {generateFromTemplate} from "fourtune/autogenerate"

const asyncToSync = {
	"import {readdir, lstat, realpath} from \"@anio-fs/api/async\"": "import {readdir, lstat, realpath} from \"@anio-fs/api/sync\"",
	"import {getTypeOfPath} from \"@anio-fs/path-type\"": "import {getTypeOfPathSync} from \"@anio-fs/path-type\"",
	"async function scandirImplementation(": "function scandirImplementation(",
	"await readdir": "readdir",
	"await lstat": "lstat",
	"const handle_current_entry = async () => {": "const handle_current_entry = () => {",
	"await options.filter(data)": "options.filter(data)",
	"await options.callback(data)": "options.callback(data)",
	"await map(data)": "map(data)",
	"const recurse = async () => {": "const recurse = () => {",
	"await scandirImplementation(": "scandirImplementation(",
	"await recurse()": "recurse()",
	"await handle_current_entry()": "handle_current_entry()",
	"async function scandirFrontend(": "function scandirFrontend(",
	"await realpath(": "realpath(",
	"const path_type = await getTypeOfPath(root_dir)": "const path_type = getTypeOfPathSync(root_dir)",
	"export default function scandirFactory(": "export default function scandirSyncFactory(",
	"return async function scandir(": "return function scandirSync(",
	"return await scandirFrontend(": "return scandirFrontend("
}

const syncTypes = {
	"$$<verb>": "Synchronously",
	"$<<note>>": "",
	"$<<ret1>>": "ScandirEntry[]",
	"$<<ret2>>": "null"
}

const asyncTypes = {
	"$$<verb>": "Asynchronously",
	"$<<note>>": "\n * Note: the specified function can be asynchronous.",
	"$<<ret1>>": "Promise<ScandirEntry[]>",
	"$<<ret2>>": "Promise<null>"
}

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"export/scandirFactory.mjs": generateFromTemplate("template/scandirFactory.mjs", {}),
		"export/scandirSyncFactory.mjs": generateFromTemplate("template/scandirFactory.mjs", asyncToSync),

		"export/scandir.d.ts": generateFromTemplate("template/scandir.d.ts", asyncTypes),
		"export/scandirSync.d.ts": generateFromTemplate("template/scandir.d.ts", syncTypes),

		"export/scandirFactory.d.ts": generateFromTemplate("template/scandirFactory.d.ts", {
			"scandir$Sync": "scandir"
		}),
		"export/scandirSyncFactory.d.ts": generateFromTemplate("template/scandirFactory.d.ts", {
			"scandir$Sync": "scandirSync"
		})
	}
}
