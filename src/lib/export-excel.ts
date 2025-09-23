import { utils, writeFile } from "xlsx";

export async function exportExcel(
  title: string,
  worksheetname: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<any>,
) {
  try {
    // Create Excel workbook and worksheet
    const workbook = utils.book_new();
    const worksheet = utils?.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, worksheetname);
    // Save the workbook as an Excel file
    writeFile(workbook, `${title}.xlsx`);
    console.log(`Exported data to ${title}.xlsx`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Export Error", error.message);
  }
}
