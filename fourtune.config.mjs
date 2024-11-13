export default {
	realm: "js",
	type: "package:async/sync",

	target: {
		function_name: "scandir",

		dependencies: {
			"@anio-fs/path-type": "getTypeOfPath"
		}
	}
}
