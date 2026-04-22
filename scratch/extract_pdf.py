import fitz # PyMuPDF
import pdfplumber
import os
import io
from PIL import Image

pdf_path = r"D:\mohan\apnaswill\context\partner-brochure-feb-26 (1).pdf"
output_dir = r"D:\mohan\apnaswill\public\brochure_assets"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

print(f"--- Extracting from: {pdf_path} ---")

# 1. Extract Text
print("\n--- TEXT CONTENT ---")
with pdfplumber.open(pdf_path) as pdf:
    for i, page in enumerate(pdf.pages):
        print(f"\n[Page {i+1}]")
        text = page.extract_text()
        if text:
            print(text)

# 2. Extract Images
print("\n--- IMAGE EXTRACTION ---")
doc = fitz.open(pdf_path)
for page_index in range(len(doc)):
    page = doc[page_index]
    image_list = page.get_images(full=True)
    
    if image_list:
        print(f"Found {len(image_list)} images on page {page_index+1}")
    
    for img_index, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        image = Image.open(io.BytesIO(image_bytes))
        image_filename = f"page{page_index+1}_img{img_index+1}.{image_ext}"
        image.save(os.path.join(output_dir, image_filename))
        print(f"Saved: {image_filename}")

doc.close()
print("\n--- EXTRACTION COMPLETE ---")
