import {generateSyncAsyncVariant} from "fourtune/autogenerate"

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"export/scandirFactory.mts": generateSyncAsyncVariant("template/scandirFactory.mts", "async"),
		"export/scandirSyncFactory.mts": generateSyncAsyncVariant("template/scandirFactory.mts", "sync")
	}
}
