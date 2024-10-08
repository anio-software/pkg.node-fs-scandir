import {generateFromTemplate} from "fourtune/autogenerate"

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"export/scandirFactory.mts": generateFromTemplate("template/scandirFactory.mts", {}),
		"export/scandirSyncFactory.mts": generateFromTemplate("template/scandirFactory.mts", {})
	}
}
