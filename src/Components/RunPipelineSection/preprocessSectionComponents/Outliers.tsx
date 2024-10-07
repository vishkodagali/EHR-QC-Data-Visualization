import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import parse from "html-react-parser";
import axios from "axios";
import React, { useEffect } from "react";
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

export const Outliers = () => {
  const { isPolling, success, error, callAPI, resetSuccess, response, resetResponse } =
    usePolling();
  const [action, setAction] = React.useState("");
  const [columns, setColumns] = React.useState<string[]>([]);
  const [source_file, setSourceFile] = React.useState<File | undefined>();
  const [id_columns, setIdColumns] = React.useState<string[]>([]);
  const [formError, setFormError] = React.useState<string>("");

  const [htmlFile, setHtmlFile] = React.useState<any | undefined>();

  useEffect(() => {
    if (response && action === "visualise") {
      // need to fetch pdf that is generated from the visualise
      axios
        .post("http://localhost:5000/fetchfile", {
          user_uuid: localStorage.getItem("userUUID"),
          fileName: "OutlierVisualised.html",
        })
        .then((response) => {
          console.log(response);
          //   const blob = new Blob([response.data], { type: "application/pdf" });
          setHtmlFile(response.data);

          //   setPdfFile(url);
          //   const downloadLink = document.createElement("a");
          //   downloadLink.href = url;
          //   downloadLink.download = "filename.pdf"; // Set the desired filename for the download
          //   downloadLink.click();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [response]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callAPI("http://localhost:5000/preprocess/outlier", "POST", {
      user_uuid: localStorage.getItem("userUUID"),
      source_file: "outlier_input.csv",
      save_path: "outlier.csv",
      action: action,
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
      formData.append("sectionName", "outlier_input");

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
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      sx={{ pt: 3, gap: 2, maxWidth: `100%` }}
    >
      <Typography variant="h3">Outliers</Typography>
      <Typography variant="body1">Removing outliers</Typography>

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
                // setHtmlFile(null);
                setAction(e.target.value);
              }}
            >
              {["clean", "visualise"].map((column) => (
                <MenuItem key={column} value={column}>
                  {column}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select the action to perform</FormHelperText>
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

          {formError && <FormHelperText error>{formError}</FormHelperText>}
          {isPolling && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
          {response && action === "clean" && (
            <RenderTable
              excelExportName="Outliers"
              tableHeading="Data Table"
              rows={formatData(response.data, response.columns)}
              columns={getFormattedColumns(response.columns, 150)}
            />
          )}
          <Button type="submit" variant="contained">
            Run Outliers
          </Button>
        </FormControl>
      </form>

      {htmlFile && parse(htmlFile)}
    </Box>
  );
};
