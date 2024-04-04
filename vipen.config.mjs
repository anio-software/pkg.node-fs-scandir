import {generateFromTemplate} from "vipen/autogenerate"

const asyncToSync = {
	"async function scandir": "function scandir",
	"await fs_object.readdir": "fs_object.readdir",
	"await fs_object.lstat": "fs_object.lstat",
	"const handle_current_entry = async () => {": "const handle_current_entry = () => {",
	"await options.filter(data)": "options.filter(data)",
	"await options.callback(data)": "options.callback(data)",
	"await map(data)": "map(data)",
	"const recurse = async () => {": "const recurse = () => {",
	"await scandir(": "scandir(",
	"await recurse()": "recurse()",
	"await handle_current_entry()": "handle_current_entry()",
	"export default async function": "export default function",
	"await fs_object.realpath(": "fs_object.realpath("
}

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"sync.mjs": generateFromTemplate("src/template.mjs", asyncToSync),
		"async.mjs": generateFromTemplate("src/template.mjs", {})
	}
}
