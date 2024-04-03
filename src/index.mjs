import createFSObject from "@anio-node-foundation/fs-api"

import sync_impl from "./auto/sync.mjs"
import async_impl from "./auto/async.mjs"

const async_fs = createFSObject({sync: false})
const sync_fs = createFSObject({sync: true})

export function scandir(root_dir, options = {}) {
	return async_impl(async_fs, root_dir, options)
}

export function scandirSync(root_dir, options = {}) {
	return sync_impl(sync_fs, root_dir, options)
}
