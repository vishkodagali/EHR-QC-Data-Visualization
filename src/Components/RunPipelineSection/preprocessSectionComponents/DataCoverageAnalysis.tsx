import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import React from "react";
import usePolling from "../../../hooks/usePolling";
import { formatData, getFormattedColumns } from "../../../utils/formatData";
import { RenderTable } from "../../Table/Table";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const DataCoverageAnalysis = () => {
  const { isPolling, success, error, callAPI, resetSuccess, response } = usePolling();
  const [source_file, setSourceFile] = React.useState<File | undefined>();
  const [chunksize, setChunksize] = React.useState<string>("10000");
  const [id_columns, setIdColumns] = React.useState<string[]>([]);
  const [percentage, setPercentage] = React.useState<string>("100");
  const [formError, setFormError] = React.useState<string>("");
  const [columns, setColumns] = React.useState<string[]>([]);
  const [droppedChecked, setDroppedChecked] = React.useState<boolean>(true);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (source_file === null || chunksize === "" || id_columns.length === 0 || percentage === "") {
      setFormError("Please fill in all required fields.");
      return;
    }
    callAPI("http://localhost:5000/preprocess/coverage", "POST", {
      user_uuid: localStorage.getItem("userUUID"),
      source_file: "data_coverage_input.csv",
      save_path: "data_coverage.csv",
      chunksize: chunksize,
      id_columns: id_columns,
      percentage: percentage,
      ...(droppedChecked && { drop: "yes" }),
      schema_name: "ehrqc_" + localStorage.getItem("userUUID"),
    });
    setFormError("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSourceFile(file);

      const formData = new FormData();
      const user_uuid = localStorage.getItem("userUUID");
      formData.append("file", file);
      formData.append("user_uuid", user_uuid ?? "");
      formData.append("sectionName", "data_coverage_input");

      axios
        .post("http://localhost:5000/import/", formData)
        .then((response) => {
          console.log(response);
          setColumns(response.data.columns);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        sx={{ pt: 3, gap: 2, maxWidth: `100%` }}
      >
        <Typography variant="h3">Data Coverage Analysis</Typography>
        <Typography variant="body1">Calculating the data coverage</Typography>
        <form onSubmit={handleOnSubmit} style={{ width: "80%" }}>
          <FormControl
            fullWidth
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" accept=".csv" onChange={handleFileUpload} />
            </Button>
            {source_file && (
              <Typography sx={{ m: 2 }}>Using imported file: {source_file.name}</Typography>
            )}

            <TextField
              variant="standard"
              fullWidth
              label="Chunksize"
              value={chunksize}
              onChange={(e) => setChunksize(e.target.value)}
              required
              defaultValue={"10000"}
              helperText="Default value is 10000"
              sx={{ m: 2 }}
            />
            <FormControl fullWidth variant="standard" sx={{ m: 2 }}>
              <InputLabel id="multiple-select-label">ID Columns</InputLabel>
              <Select
                labelId="multiple-select-label"
                multiple
                label="ID Columns"
                value={id_columns}
                onChange={(e) => setIdColumns(e.target.value as string[])}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {columns &&
                  columns.map((column) => (
                    <MenuItem key={column} value={column}>
                      {column}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>
                List of ID columns. They are used to group the other columns to calculate missing
                percentage.
              </FormHelperText>
            </FormControl>
            <TextField
              variant="standard"
              fullWidth
              label="Percentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              required
              sx={{ m: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  checked={droppedChecked}
                  onChange={() => setDroppedChecked(!droppedChecked)}
                />
              }
              label="Drop Columns?"
            />
            {formError && <FormHelperText error>{formError}</FormHelperText>}

            <Button type="submit" variant="contained">
              Run Data Coverage Analysis
            </Button>
            <Typography variant="h6">
              Dropping columns with above {percentage}% missingness
            </Typography>
          </FormControl>
        </form>

        {response && (
          <RenderTable
            excelExportName="Missing Count"
            tableHeading="Missing Data Table"
            rows={formatData(response.missing_df, [
              "column_name",
              "missing_count",
              "percentage_missing",
              "total_count",
            ])}
            columns={getFormattedColumns(
              ["column_name", "missing_count", "percentage_missing", "total_count"],
              150
            )}
            showSlots={false}
          />
        )}
        {response && (
          <RenderTable
            excelExportName="Data Coverage Analysis"
            tableHeading="Data Table"
            rows={formatData(response.data, response.columns)}
            columns={getFormattedColumns(response.columns, 150)}
          />
        )}
      </Box>
    </>
  );
};
