import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import React from "react";

interface ITableProps {
  tableHeading: string;
  columns: any[];
  rows: any[];
  showSlots?: boolean;
  excelExportName: string;
}

function CustomToolbar(props: any) {
  return (
    <GridToolbarContainer>
      <GridToolbar
        csvOptions={{
          fileName: props.fileName,
        }}
      />
    </GridToolbarContainer>
  );
}
export const RenderTable = ({
  tableHeading,
  columns,
  rows: tableRows,
  showSlots = true,
  excelExportName,
}: ITableProps) => {
  const rowsWithIds = tableRows.map((row, index) => ({
    id: index + 1,
    ...row,
  }));

  return (
    <Box
      sx={{
        height: 800,
        width: "100%",
        pt: 2,
        overflow: "auto",
      }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography variant="h6">{tableHeading}</Typography>
      {showSlots ? (
        <DataGrid
          autoPageSize
          rows={rowsWithIds}
          columns={columns}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{ toolbar: { fileName: excelExportName } }}
          sx={{ width: "100%", maxWidth: "100%" }}
        />
      ) : (
        <DataGrid autoPageSize rows={rowsWithIds} columns={columns} sx={{ maxWidth: "100%" }} />
      )}
    </Box>
  );
};
