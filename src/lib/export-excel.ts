import * as XLSX from "xlsx";

export async function exportExcel(
  title: string,
  worksheetname: string,
  data: Array<any>,
) {
  try {
    // Create Excel workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils?.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, `${title}.xlsx`);
    console.log(`Exported data to ${title}.xlsx`);
  } catch (error: any) {
    console.error("Export Error", error.message);
  }
}
