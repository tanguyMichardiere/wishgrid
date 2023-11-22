export const getBase64 = (file: File): Promise<string> =>
  new Promise(function (resolve) {
    const reader = new FileReader();
    reader.addEventListener("load", function (event) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/consistent-type-assertions
      const imageUrl = event.target!.result as string;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      resolve(imageUrl.split(",", 2)[1]!);
    });
    reader.readAsDataURL(file);
  });
