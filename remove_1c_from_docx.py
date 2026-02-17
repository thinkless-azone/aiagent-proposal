from docx import Document

def remove_row_containing_text(table, text):
    rows_to_delete = []
    for row in table.rows:
        for cell in row.cells:
            if text in cell.text:
                rows_to_delete.append(row)
                break
    
    for row in rows_to_delete:
        # This is a workaround to delete a row in python-docx
        # We need to access the XML element and remove it
        tbl = row._element.getparent()
        tbl.remove(row._element)
        print(f"Removed row containing: {text}")

# Load the v3 document
doc_path = "/home/ubuntu/ai-agent-proposal/client/public/Проектноепредложение3_v3.docx"
doc = Document(doc_path)

# Iterate through all tables in the document
found = False
for table in doc.tables:
    # Try to find and remove the row with "1С:Предприятие"
    # We look for "1С:Предприятие" or similar text
    remove_row_containing_text(table, "1С:Предприятие")
    remove_row_containing_text(table, "1С: Предприятие")

# Save as v4
output_path = "/home/ubuntu/ai-agent-proposal/client/public/Проектноепредложение3_v4.docx"
doc.save(output_path)
print(f"Document saved to {output_path}")
