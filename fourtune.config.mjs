import {generateFactoryFiles} from "@fourtune/realm-js/v0/autogenerate"

export default {
	realm: {
		name: "js",
		type: "package",

		options: {
			runtime: "node"
		}
	},

	autogenerate: {
		...generateFactoryFiles({
			source_file: "src/__scandirXXXMapped.as.mts",
			export_name: "scandirXXX",
			destination: "src/export"
		}),
		...generateFactoryFiles({
			source_file: "src/__scandirXXXCallback.as.mts",
			export_name: "scandirXXXCallback",
			destination: "src/export"
		})
	}
}
