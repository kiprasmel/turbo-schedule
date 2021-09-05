/**
 * [Ab]ort[C]ontroller
 *
 * The only reason for this util is to have
 * the `abort` work when destructured.
 *
 */
export const abc = (): InstanceType<typeof AbortController> => {
	const controller = new AbortController();

	const { signal } = controller;
	const abort = (): void => controller.abort(); // TODO try out `return abort.bind(c)`
	// some alternatives:
	// const abort = controller.abort.bind(controller);
	// const abort = (): void => AbortController.prototype.abort.call(controller);
	// const abort = (): void => controller.abort.call(controller);

	return { signal, abort };
};
