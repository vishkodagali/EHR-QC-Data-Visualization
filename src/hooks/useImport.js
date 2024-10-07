import React from "react";
import { StepDataContext } from "../contexts/StepDataContext";
import axios from "axios";

export const useImport = (sectionName, user_uuid) => {
  const { stepData, updateStepData } = React.useContext(StepDataContext);

  const [file, setFile] = React.useState(stepData["import"][sectionName]?.file || null);
  const [fileData, setFileData] = React.useState(stepData["import"][sectionName]?.fileData || null);
  const [fileColumns, setFileColumns] = React.useState(
    stepData["import"][sectionName]?.fileColumns || null
  );

  const resetFileData = () => {
    setFile(null);
    setFileData(null);
    updateStepData("import", {
      ...stepData["import"],
      [sectionName]: {
        ...stepData?.["import"]?.[sectionName],
        file: null,
        fileData: null,
        fileColumns: null,
      },
    });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImport = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_uuid", user_uuid);
    formData.append("sectionName", sectionName);

    axios
      .post("http://localhost:5000/import/", formData)
      .then((response) => {
        setFileData(response.data.data);
        setFileColumns(response.data.columns);
        updateStepData("import", {
          ...stepData["import"],
          [sectionName]: {
            ...stepData["import"][sectionName],
            fileData: response.data.data,
            fileColumns: response.data.columns,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    file,
    fileColumns,
    fileData,
    resetFileData,
    handleFileChange,
    handleImport,
  };
};
