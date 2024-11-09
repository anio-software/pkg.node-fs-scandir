import {generateAsyncSyncVariant} from "fourtune/autogenerate"

export default {
	realm: "js",
	type: "package:async/sync",

	autogenerate: {
		"src/export/ScandirOptionsType.d.mts": generateAsyncSyncVariant("template/ScandirOptionsType.d.mts", "async"),
		"src/export/ScandirSyncOptionsType.d.mts": generateAsyncSyncVariant("template/ScandirOptionsType.d.mts", "sync"),
	},

	target: {
		function_name: "scandir",

		dependencies: {
			"@anio-fs/path-type": "getTypeOfPath"
		}
	}
}
