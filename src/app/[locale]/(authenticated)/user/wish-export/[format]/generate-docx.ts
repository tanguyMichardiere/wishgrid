import { Document, ExternalHyperlink, Packer, Paragraph, TextRun } from "docx";

export async function generateDocx(
	wishes: Array<{ title: string; description: string; link: string }>,
): Promise<Buffer> {
	return Packer.toBuffer(
		new Document({
			sections: [
				{
					properties: {},
					children: wishes.flatMap((wish) => {
						const paragraphs: Paragraph[] = [
							new Paragraph({
								children: [
									new TextRun({
										text: wish.title,
										font: "Helvetica",
										bold: true,
									}),
								],
							}),
						];
						if (wish.description !== "") {
							for (const text of wish.description.split("\n")) {
								paragraphs.push(
									new Paragraph({
										children: [
											new TextRun({
												text,
												font: "Helvetica",
											}),
										],
									}),
								);
							}
						}
						if (wish.link !== "") {
							paragraphs.push(
								new Paragraph({
									children: [
										new ExternalHyperlink({
											children: [
												new TextRun({
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
						paragraphs.push(new Paragraph({}));
						return paragraphs;
					}),
				},
			],
		}),
	);
}
