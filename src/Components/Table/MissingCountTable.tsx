import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Box,
  Typography,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import React, { useState } from "react";

interface IRenderMissingCountTable {
  columns: string[];
  missing_count: string[];
}

export const RenderMissingCountTable = ({ columns, missing_count }: IRenderMissingCountTable) => {
  const [sortConfig, setSortConfig] = useState({ key: "MissingCount", direction: "asc" });

  const sortedColumns = columns.slice().sort((a, b) => {
    const aCount = parseInt(missing_count[columns.indexOf(a)]);
    const bCount = parseInt(missing_count[columns.indexOf(b)]);
    if (sortConfig.direction === "asc") {
      return aCount - bCount;
    } else {
      return bCount - aCount;
    }
  });

  const requestSort = () => {
    const direction = sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key: "MissingCount", direction });
  };

  const totalMissingCount = missing_count.reduce((acc, curr) => acc + parseInt(curr), 0);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="subtitle1">Missing Counts Table</Typography>
        <Typography variant="subtitle1">Total Missing Count: {totalMissingCount}</Typography>
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: "auto" }}>
        <Table sx={{ maxWidth: 450 }} size="small" aria-label="Missing Count table">
          <TableHead>
            <TableRow>
              <TableCell>Column</TableCell>
              <TableCell onClick={requestSort}>
                Missing Count
                {sortConfig.key === "MissingCount" &&
                  (sortConfig.direction === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedColumns.map((value: string, index: number) => (
              <TableRow key={value + index}>
                <TableCell>{value}</TableCell>
                <TableCell>{missing_count[columns.indexOf(value)]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
