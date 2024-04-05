import sync_impl from "./auto/sync.mjs"
import async_impl from "./auto/async.mjs"

export function scandir(path, options = {}) {
	return async_impl(path, options)
}

export function scandirSync(path, options = {}) {
	return sync_impl(path, options)
}
