import {generateSyncAsyncVariant} from "fourtune/autogenerate"

export default {
	realm: "js",
	type: "package:async/sync",

	autogenerate: {
		"export/ScandirOptionsType.d.mts": generateSyncAsyncVariant("template/ScandirOptionsType.d.mts", "async"),
		"export/ScandirSyncOptionsType.d.mts": generateSyncAsyncVariant("template/ScandirOptionsType.d.mts", "sync"),
	},

	target: {
		function_name: "scandir",

		dependencies: {
			"@anio-fs/path-type": "getTypeOfPath"
		}
	}
}
