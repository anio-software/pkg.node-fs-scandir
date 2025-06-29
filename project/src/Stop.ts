export type Stop = {
	stopRecursion: () => symbol
	stopLoop: (returnValue?: boolean) => symbol
}
