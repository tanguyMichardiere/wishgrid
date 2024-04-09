import * as docx from "docx";

export async function generateDocx(
	wishes: Array<{ title: string; description: string; link: string }>,
): Promise<Buffer> {
	return docx.Packer.toBuffer(
		new docx.Document({
			sections: [
				{
					properties: {},
					children: wishes.flatMap((wish) => {
						const paragraphs: docx.Paragraph[] = [
							new docx.Paragraph({
								children: [new docx.TextRun({ text: wish.title, font: "Helvetica", bold: true })],
							}),
						];
						if (wish.description !== "") {
							for (const text of wish.description.split("\n")) {
								paragraphs.push(
									new docx.Paragraph({ children: [new docx.TextRun({ text, font: "Helvetica" })] }),
								);
							}
						}
						if (wish.link !== "") {
							paragraphs.push(
								new docx.Paragraph({
									children: [
										new docx.ExternalHyperlink({
											children: [
												new docx.TextRun({
													text: wish.link,
													font: "Helvetica",
													style: "Hyperlink",
												}),
											],
											link: wish.link,
										}),
									],
								}),
							);
						}
						paragraphs.push(new docx.Paragraph({}));
						return paragraphs;
					}),
				},
			],
		}),
	);
}
