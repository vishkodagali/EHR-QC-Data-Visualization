import { GridColDef } from "@mui/x-data-grid";

export const formatData = (data: any[], columns: string[]): any[] => {
  const reorderedData = data.map((row) => {
    const reorderedRow: any = {};
    columns.forEach((column: string) => {
      if (row.hasOwnProperty(column)) {
        reorderedRow[column] = row[column];
      }
    });
    return reorderedRow;
  });
  return reorderedData;
};

export const getFormattedColumns = (
  data: any[],
  width: number
): GridColDef<(typeof data)[number]>[] => {
  return data.map((key) => ({
    field: key,
    headerName: key,
    editable: false,
    width: width,
  }));
};
