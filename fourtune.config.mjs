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

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"export/scandirFactory.mjs": generateFromTemplate("src/scandirFactory.mjs", {}),
		"export/scandirSyncFactory.mjs": generateFromTemplate("src/scandirFactory.mjs", asyncToSync)
	}
}
