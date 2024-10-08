import {generateSyncAsyncVariant} from "fourtune/autogenerate"

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"export/scandirFactory.mts": generateSyncAsyncVariant("template/scandirFactory.mts", "async"),
		"export/scandirSyncFactory.mts": generateSyncAsyncVariant("template/scandirFactory.mts", "sync"),

		"export/scandir.mts": generateSyncAsyncVariant("template/scandir.mts", "async"),
		"export/scandirSync.mts": generateSyncAsyncVariant("template/scandir.mts", "sync"),

		"ScandirOptions.d.mts": generateSyncAsyncVariant("template/ScandirOptions.d.mts", "async"),
		"ScandirSyncOptions.d.mts": generateSyncAsyncVariant("template/ScandirOptions.d.mts", "sync"),
	}
}
