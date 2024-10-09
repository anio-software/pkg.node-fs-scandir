import {generateSyncAsyncVariant} from "fourtune/autogenerate"

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"export/scandirFactory.mts": generateSyncAsyncVariant("template/scandirFactory.mts", "async"),
		"export/scandirSyncFactory.mts": generateSyncAsyncVariant("template/scandirFactory.mts", "sync"),

		"export/scandir.mts": generateSyncAsyncVariant("template/scandir.mts", "async"),
		"export/scandirSync.mts": generateSyncAsyncVariant("template/scandir.mts", "sync"),

		"ScandirOptionsType.d.mts": generateSyncAsyncVariant("template/ScandirOptionsType.d.mts", "async"),
		"ScandirSyncOptionsType.d.mts": generateSyncAsyncVariant("template/ScandirOptionsType.d.mts", "sync"),
	}
}
