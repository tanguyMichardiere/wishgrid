interface Promise<T> {
	// replace any with unknown
	catch<Result = never>(
		onrejected?: ((reason: unknown) => Result | PromiseLike<Result>) | undefined | null,
	): Promise<T | Result>;
}
