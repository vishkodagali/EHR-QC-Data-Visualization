import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { CallAPISection } from "../CallAPISection";
import usePolling from "../../../hooks/usePolling";
import axios from "axios";
import { RenderTable } from "../../Table/Table";
import { formatData, getFormattedColumns } from "../../../utils/formatData";

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

export const Impute = () => {
  const { isPolling, success, error, callAPI, resetSuccess, response, resetResponse } =
    usePolling();
  const [action, setAction] = React.useState("");
  const [percentage, setPercentage] = React.useState<string>("");
  const [algorithm, setAlgorithm] = React.useState<string>("");
  const [columns, setColumns] = React.useState<string[]>([]);
  const [source_file, setSourceFile] = React.useState<File | undefined>();
  const [id_columns, setIdColumns] = React.useState<string[]>([]);
  const [formError, setFormError] = React.useState<string>("");

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Impute");
    callAPI("http://localhost:5000/preprocess/impute", "POST", {
      user_uuid: localStorage.getItem("userUUID"),
      source_file: "impute_input.csv",
      save_path: "impute.csv",
      action: action,
      percentage: percentage,
      algorithm: algorithm,
      columns: id_columns,
      schema_name: "ehrqc_" + localStorage.getItem("userUUID"),
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0]);
    const file = e.target.files?.[0];
    if (file) {
      setSourceFile(file);

      const formData = new FormData();
      const user_uuid = localStorage.getItem("userUUID");
      formData.append("file", file);
      formData.append("user_uuid", user_uuid ?? "");
      formData.append("sectionName", "impute_input");

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
        <Typography variant="h3">Impute</Typography>
        <Typography variant="body1">Imputing missing values</Typography>

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

            <FormControl fullWidth variant="standard" sx={{ m: 2 }}>
              <InputLabel id="select-label">Actions</InputLabel>
              <Select
                labelId="select-label"
                label="Action"
                value={action}
                required
                onChange={(e) => {
                  resetResponse();
                  setAction(e.target.value);
                }}
              >
                {["impute", "compare"].map((column) => (
                  <MenuItem key={column} value={column}>
                    {column}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select the action to perform</FormHelperText>
            </FormControl>

            <FormControl fullWidth variant="standard" sx={{ m: 2 }}>
              <InputLabel id="select-label">Algorithm</InputLabel>
              <Select
                labelId="select-label"
                label="Action"
                required
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
              >
                {[
                  "mean",
                  "median",
                  "knn",
                  "miss_forest",
                  "expectation_maximization",
                  "multiple_imputation",
                ].map((column) => (
                  <MenuItem key={column} value={column}>
                    {column}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select the Missing data imputation algorithm</FormHelperText>
            </FormControl>

            <FormControl fullWidth variant="standard" sx={{ m: 2 }}>
              <InputLabel id="multiple-select-label">ID Columns</InputLabel>
              <Select
                labelId="multiple-select-label"
                multiple
                label="ID Columns"
                required
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
              <FormHelperText>Select one or more ID columns</FormHelperText>
            </FormControl>
            <TextField
              variant="standard"
              fullWidth
              label="Percentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              required={action === "impute" ? false : true}
              helperText="Missing value proportion for comparison (required only for action=compare)"
              sx={{ m: 2 }}
            />

            {formError && <FormHelperText error>{formError}</FormHelperText>}

            <Button type="submit" variant="contained">
              Run Impute
            </Button>
            {/* <Typography variant="h6">
              Dropping columns with above {percentage}% missingness
            </Typography> */}
          </FormControl>
        </form>

        {error && <Alert severity="error">Error occured</Alert>}
        {isPolling && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        {response && action === "compare" && (
          <>
            <Typography>meanR2 : {response.meanR2}</Typography>
            <Typography>medianR2 : {response.medianR2}</Typography>
            <Typography>knnR2 : {response.knnR2}</Typography>
            <Typography>mfR2 : {response.mfR2}</Typography>
            <Typography>emR2 : {response.emR2}</Typography>
            <Typography>miR2 : {response.miR2}</Typography>
          </>
        )}

        {response && action === "impute" && (
          <RenderTable
            excelExportName="Impute"
            tableHeading="Data Table"
            rows={formatData(response.data, response.columns)}
            columns={getFormattedColumns(response.columns, 150)}
          />
        )}
      </Box>
    </>
  );
};

// {
//     "action": "impute",
//     "source_path":"phillipCoverageTest.csv",
//     "p":"",
//     "save_path":"testImpute.csv",
//     "algorithm": "miss_forest",
//     "columns" : [
//     "White blood cell count", "Chloride salt", "Haemoglobin estimation",
// "MCHC - Mean corpuscular haemoglobin concentration",
// "MCH - Mean corpuscular haemoglobin", "MCV - Mean corpuscular volume",
// "Red blood cell count", "Red blood cell distribution width",
// "Alanine aminotransferase", "Albumin", "Total protein measurement"
//     ]
// }
