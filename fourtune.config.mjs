import {generateAsyncSyncVariant} from "fourtune/autogenerate"

export default {
	realm: "js",
	type: "package:async/sync",

	autogenerate: {
		"src/export/ScandirOptions.d.mts": generateAsyncSyncVariant("src/template/ScandirOptions.d.mts", "async"),
		"src/export/ScandirSyncOptions.d.mts": generateAsyncSyncVariant("src/template/ScandirOptions.d.mts", "sync"),
	},

	target: {
		function_name: "scandir",

		dependencies: {
			"@anio-fs/path-type": "getTypeOfPath"
		}
	}
}
