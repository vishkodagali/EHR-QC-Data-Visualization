import React from "react";

import usePolling from "../../../hooks/usePolling";
import { RenderTable } from "../../Table/Table";
import { formatData, getFormattedColumns } from "../../../utils/formatData";
import { Alert, Box, Button, LinearProgress, Typography } from "@mui/material";

export const ConceptCoverage = () => {
  const { isPolling, error, callAPI, response } = usePolling();
  //requires schema_name and save_file
  const handleOnClick = () => {
    callAPI("http://localhost:5000/preprocess/conceptCoverage", "POST", {
      user_uuid: localStorage.getItem("userUUID"),
      schema_name: "ehrqc_" + localStorage.getItem("userUUID"),
      save_file: "concept_coverage.csv",
    });
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ pt: 3, gap: 2, maxWidth: `100%` }}
    >
      <Typography variant="h3">Concept Coverage</Typography>
      <Typography variant="body1">
        Calculating the concept coverage based on your current data from standardisation
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          handleOnClick();
        }}
      >
        Run Concept Coverage
      </Button>
      {isPolling && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error">
          Error has occured, please check configurations and try again.
        </Alert>
      )}
      {response && (
        <>
          <RenderTable
            excelExportName="Concept Coverage"
            tableHeading="Concept Coverage"
            rows={formatData(response.data, response.columns)}
            columns={getFormattedColumns(response.columns, 200)}
          />
        </>
      )}
    </Box>
  );
};
