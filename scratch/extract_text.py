import pdfplumber

pdf_path = r"D:\mohan\apnaswill\context\partner-brochure-feb-26 (1).pdf"
output_path = r"D:\mohan\apnaswill\scratch\brochure_text.md"

with pdfplumber.open(pdf_path) as pdf:
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("# 📄 Partner Brochure Content - Feb 2026\n\n")
        for i, page in enumerate(pdf.pages):
            f.write(f"## Page {i+1}\n\n")
            text = page.extract_text()
            if text:
                f.write(text)
                f.write("\n\n---\n\n")

print(f"Text extracted to: {output_path}")
