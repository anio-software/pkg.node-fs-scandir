import {generateFromTemplate} from "fourtune/autogenerate"

const asyncToSync = {
	"import {readdir, lstat, realpath} from \"@anio-fs/api/async\"": "import {readdir, lstat, realpath} from \"@anio-fs/api/sync\"",
	"import {getTypeOfPath} from \"@anio-fs/path-type\"": "import {getTypeOfPathSync} from \"@anio-fs/path-type\"",
	"async function scandir(": "function scandir(",
	"await readdir": "readdir",
	"await lstat": "lstat",
	"const handle_current_entry = async () => {": "const handle_current_entry = () => {",
	"await options.filter(data)": "options.filter(data)",
	"await options.callback(data)": "options.callback(data)",
	"await map(data)": "map(data)",
	"const recurse = async () => {": "const recurse = () => {",
	"await scandir(": "scandir(",
	"await recurse()": "recurse()",
	"await handle_current_entry()": "handle_current_entry()",
	"export default async function": "export default function",
	"await realpath(": "realpath(",
	"const path_type = await getTypeOfPath(root_dir)": "const path_type = getTypeOfPathSync(root_dir)"
}

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"sync.mjs": generateFromTemplate("src/template.mjs", asyncToSync),
		"async.mjs": generateFromTemplate("src/template.mjs", {})
	}
}
