import * as DOCX from "docx";

export async function generateDocx(
  wishes: Array<{ title: string; description: string; link: string }>,
): Promise<Buffer> {
  return DOCX.Packer.toBuffer(
    new DOCX.Document({
      sections: [
        {
          properties: {},
          children: wishes.flatMap(function (wish) {
            const paragraphs: Array<DOCX.Paragraph> = [
              new DOCX.Paragraph({
                children: [new DOCX.TextRun({ text: wish.title, font: "Helvetica", bold: true })],
              }),
            ];
            if (wish.description !== "") {
              for (const text of wish.description.split("\n")) {
                paragraphs.push(
                  new DOCX.Paragraph({ children: [new DOCX.TextRun({ text, font: "Helvetica" })] }),
                );
              }
            }
            if (wish.link !== "") {
              paragraphs.push(
                new DOCX.Paragraph({
                  children: [
                    new DOCX.ExternalHyperlink({
                      children: [
                        new DOCX.TextRun({
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
            paragraphs.push(new DOCX.Paragraph({}));
            return paragraphs;
          }),
        },
      ],
    }),
  );
}
