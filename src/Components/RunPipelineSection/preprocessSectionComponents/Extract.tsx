import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import usePolling from "../../../hooks/usePolling";
import { formatData, getFormattedColumns } from "../../../utils/formatData";
import { RenderMissingCountTable } from "../../Table/MissingCountTable";
import { RenderTable } from "../../Table/Table";

export const Extract = () => {
  const [sqlCode, setSqlCode] = useState("");
  const [readyMadeSQLSelection, setReadyMadeSQLSelection] = useState("");
  const [selectError, setSelectError] = useState(false);
  const { isPolling, success, error, callAPI, resetSuccess, response } = usePolling();
  const [isSwitchChecked, setIsSwitchChecked] = useState(false); // State for Switch

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const sql = e.target?.result as string;
        setSqlCode(sql);
      };
      reader.readAsText(file);
    }
  };

  const handleSQLSubmit = () => {
    // Handle submission of SQL code here
    callAPI("http://localhost:5000/preprocess/extract", "POST", {});
  };

  const handleSave = () => {};

  const handleSubmit = () => {
    console.log(readyMadeSQLSelection);
    setSelectError(false);
    // Handle submission of table selection and category selection here
    if (readyMadeSQLSelection === "") {
      setSelectError(true);
      return;
    }

    callAPI("http://localhost:5000/preprocess/extract", "POST", {
      user_uuid: localStorage.getItem("userUUID"),
      schema_name: "ehrqc_" + localStorage.getItem("userUUID"),
      save_file: "extract.csv",
      sql_file_path: readyMadeSQLSelection,
    });
  };

  return (
    <>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        sx={{ pt: 3, gap: 2, maxWidth: `100%` }} // maxWidth={`calc(100% - 240px)`}
      >
        <Typography variant="h3">Extract</Typography>
        <Typography variant="subtitle1">Extracting the data based on your SQL!</Typography>
        <Typography variant="subtitle1">Or feel free to use any of the defaults</Typography>

        <FormControl sx={{ m: 1, minWidth: "50%", maxWidth: "80%" }}>
          <InputLabel id="tableSelectionLabel">Ready made SQL queries</InputLabel>
          <Select
            id="tableSelection"
            labelId="tableSelectionLabel"
            value={readyMadeSQLSelection}
            label="Ready made SQL queries"
            onChange={(e) => setReadyMadeSQLSelection(e.target.value)}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="omop_labs_episode_date/avg.sql">Labs-avg</MenuItem>
            <MenuItem value="omop_labs_episode_date/first.sql">Labs-first</MenuItem>
            <MenuItem value="omop_labs_episode_date/last.sql">Labs-last</MenuItem>
            <MenuItem value="omop_labs_episode_date/min.sql">Labs-min</MenuItem>
            <MenuItem value="omop_labs_episode_date/max.sql">Labs-max</MenuItem>
            <MenuItem value="omop_labs_episode_date/stddev.sql">Labs-stddev</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSubmit} sx={{ m: 2, maxWidth: "fit-content" }}>
          Run Extract
        </Button>

        {selectError && (
          <Alert severity="error" sx={{ p: 2 }}>
            Please select before extracting!
          </Alert>
        )}

        {isPolling && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}

        {response && response?.missing_count && (
          <Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              width={"100%"}
              height={"100%"}
            >
              <Typography variant="h6">Data Extracted</Typography>
              <Typography>Total Rows: {Object.keys(response.data).length}</Typography>
              <Typography>Total Columns: {response.columns.length}</Typography>
              <Typography>
                Total Missing Counts:{" "}
                {JSON.parse(response.missing_count).reduce(
                  (acc: number, curr: string) => acc + parseInt(curr),
                  0
                )}
              </Typography>
              <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Typography variant="body2">Show Missing Counts Table</Typography>
                <Switch
                  checked={isSwitchChecked}
                  onChange={() => setIsSwitchChecked(!isSwitchChecked)}
                />
              </Box>

              {isSwitchChecked && (
                <>
                  <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                    <Typography variant="h6">Statistics</Typography>
                    <RenderMissingCountTable
                      columns={response.columns}
                      missing_count={JSON.parse(response.missing_count)}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Box>
        )}
        {response?.data && (
          <RenderTable
            excelExportName="Extract"
            tableHeading="Extracted Data"
            columns={getFormattedColumns(response.columns, 150)}
            rows={formatData(response.data, response.columns)}
          />
        )}
      </Box>
    </>
  );
};
