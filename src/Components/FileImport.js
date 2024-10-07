import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box } from "@mui/system";
import React, { useMemo } from "react";
// import { Button, Card, Form, FormSelect } from "react-bootstrap";
import { StepDataContext } from "../contexts/StepDataContext";
import { useImport } from "../hooks/useImport";
import { formatData, getFormattedColumns } from "../utils/formatData";
import "./FileImport.css";
import { RenderTable } from "./Table/Table";
import {
  Button,
  styled,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const column_mapping = {
  patients: {
    patient_id: null,
    gender: null,
    age: null,
    dob: null,
    dod: null,
  },
  admissions: {
    patient_id: null,
    episode_id: null,
    admittime: null,
    dischtime: null,
    deathtime: null,
    admission_type: null,
    admission_location: null,
    discharge_location: null,
    insurance: null,
    language: null,
    marital_status: null,
    ethnicity: null,
    edregtime: null,
    edouttime: null,
    hospital_expire_flag: null,
  },
  chartevents: {
    patient_id: null,
    episode_id: null,
    vital_id: null,
    charttime: null,
    storetime: null,
    itemid: null,
    value: null,
    valuenum: null,
    valueuom: null,
    warning: null,
  },
  labevents: {
    labevent_id: null,
    patient_id: null,
    episode_id: null,
    specimen_id: null,
    itemid: null,
    charttime: null,
    storetime: null,
    value: null,
    valuenum: null,
    valueuom: null,
    ref_range_lower: null,
    ref_range_upper: null,
    flag: null,
    priority: null,
    comments: null,
  },
  diagnosis: {
    diagnosis_id: null,
    patient_id: null,
    episode_id: null,
    charttime: null,
    diagnosis: null,
    diagnosis_description: null,
  },
};

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

const FileImport = ({ sectionName, user_uuid }) => {
  const { fileColumns, fileData, handleFileChange, handleImport, resetFileData } = useImport(
    sectionName,
    user_uuid
  );
  const [sourceFile, setSourceFile] = React.useState(null);
  const { stepData, updateStepData } = React.useContext(StepDataContext);

  const MemoizedRenderTable = React.memo(RenderTable);

  const columns = useMemo(() => Object.keys(column_mapping[sectionName]), [sectionName]);

  React.useEffect(() => {
    if (columns) {
      const columnsObject = columns.reduce((obj, column) => {
        obj[column] = stepData?.["import"]?.[sectionName]?.["column_mapping"]?.[column] || null;
        return obj;
      }, {});

      updateStepData("import", {
        ...stepData["import"],
        [sectionName]: {
          ...stepData["import"][sectionName],
          column_mapping: {
            ...columnsObject,
          },
          fileData: stepData["import"][sectionName].fileData || null,
        },
      });
    }
  }, []);

  function renderCardDetails() {
    if (fileData?.[0]) {
      return renderSuccess();
    } else {
      return renderImport();
    }
  }

  function renderSuccess() {
    return (
      <Box sx={{ maxWidth: `100%` }}>
        <FormControl fullWidth>
          {columns.map((columnName) => (
            <Box key={sectionName + columnName}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-label">{columnName}</InputLabel>
                <Select
                  labelId="select-label"
                  label={columnName}
                  value={
                    stepData?.["import"]?.[sectionName]?.["column_mapping"]?.[columnName] || ""
                  }
                  onChange={(e) => {
                    let temp = stepData["import"];
                    temp[sectionName] = {
                      ...temp[sectionName],
                      column_mapping: {
                        ...temp[sectionName].column_mapping,
                        [columnName]: e.target.value,
                      },
                    };
                    updateStepData("import", temp);
                  }}
                >
                  <MenuItem value={null}>None</MenuItem>
                  {fileColumns.map((column) => (
                    <MenuItem key={sectionName + column} value={column}>
                      {column}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}
        </FormControl>
        {fileData && fileColumns && (
          <MemoizedRenderTable
            excelExportName={sectionName}
            tableHeading={sectionName}
            columns={getFormattedColumns(fileColumns)}
            rows={formatData(fileData, fileColumns)}
          />
        )}
        <Button variant="danger" onClick={() => resetFileData()}>
          Cancel
        </Button>
      </Box>
    );
  }

  function renderImport() {
    return (
      <>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            accept=".csv"
            onChange={(e) => {
              setSourceFile(e.target.files?.[0]);
              handleImport(e.target.files?.[0]);
            }}
          />
        </Button>
        {sourceFile && (
          <Typography sx={{ m: 2 }}>Using imported file: {sourceFile.name}</Typography>
        )}
      </>
    );
  }

  return (
    <Card sx={{ minWidth: 275, margin: 2, maxWidth: `100%` }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {sectionName}
        </Typography>
        {fileData ? renderCardDetails() : renderImport()}
      </CardContent>
    </Card>
  );
};

export default FileImport;
