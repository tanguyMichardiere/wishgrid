import PDF from "pdfkit";
import WritableBuffer from "./WritableBuffer";

const defaultFont = "Helvetica";
const defaultColor = "black";

export async function generatePdf(
  wishes: Array<{ title: string; description: string; link: string }>,
): Promise<Buffer> {
  const stream = new WritableBuffer();
  const doc = new PDF().font(defaultFont).fillAndStroke(defaultColor);
  doc.pipe(stream);
  for (const wish of wishes) {
    doc.font("Helvetica-Bold").text(wish.title).font(defaultFont);
    if (wish.description !== "") {
      doc.text(wish.description);
    }
    if (wish.link !== "") {
      doc
        .fillAndStroke("blue")
        .text(wish.link, { link: wish.link, underline: true })
        .fillAndStroke(defaultColor);
    }
    doc.moveDown();
  }
  doc.end();
  await stream.finish();
  return stream.toBuffer();
}
