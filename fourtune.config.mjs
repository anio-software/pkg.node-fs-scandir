import {generateFromTemplate} from "fourtune/autogenerate"

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"export/scandirFactory.mjs": generateFromTemplate("template/scandirFactory.mjs", {}),
		"export/scandirSyncFactory.mjs": generateFromTemplate("template/scandirFactory.mjs", {})
	}
}
