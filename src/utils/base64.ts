import "client-only";

export const getBase64 = (file: File): Promise<string> =>
	new Promise((resolve) => {
		const reader = new FileReader();
		reader.addEventListener("load", (event) => {
			// biome-ignore lint/style/noNonNullAssertion: event.target is always a FileReader
			const imageUrl = event.target!.result as string;
			// biome-ignore lint/style/noNonNullAssertion: a data URL always contains a comma
			resolve(imageUrl.split(",", 2)[1]!);
		});
		reader.readAsDataURL(file);
	});
