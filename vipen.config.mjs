import {searchAndReplace, copyFile} from "vipen/processing"

const asyncToSync = {
	"async function scandir": "function scandir",
	"await fs_object.readdir": "fs_object.readdir",
	"await fs_object.lstat": "fs_object.lstat",
	"const handle_current_entry = async () => {": "const handle_current_entry = () => {",
	"await options.callback(data)": "options.callback(data)",
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

	preprocessing: [
		searchAndReplace("src/template.mjs", asyncToSync, "src/auto/sync.mjs"),
		copyFile("src/template.mjs", "src/auto/async.mjs")
	]
}
