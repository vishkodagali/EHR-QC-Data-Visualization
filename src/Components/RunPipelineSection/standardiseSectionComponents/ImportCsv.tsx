import React, { useMemo } from "react";
import { StepDataContext } from "../../../contexts/StepDataContext";
import { getCheckedData, getStandardiseJSON } from "../../../utils/getStandardiseJSON";
import { ImportSectionCards } from "../../import/ImportSectionCards";
import { Alert, Button, Spinner } from "react-bootstrap";
import usePolling from "../../../hooks/usePolling";
import { CallAPISection } from "../CallAPISection";
import { Box, Typography } from "@mui/material";
export const ImportCSV = () => {
  const { stepData } = React.useContext(StepDataContext);

  // get the data which are checked from importConfigSection.
  const importData = useMemo(() => getCheckedData(stepData.import), [stepData.import]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ pt: 3, gap: 2, maxWidth: `100%` }}
    >
      <Typography variant="h3">Import CSV</Typography>
      <Typography variant="body1">
        This step is responsible for importing EHR data into the database from the CSV files you
        have submitted earlier.
      </Typography>
      <Typography variant="body1">
        Please make sure that all the column mappings you have provided are correct. They are
        displayed below.
      </Typography>

      {importData && <ImportSectionCards data={importData} />}

      <CallAPISection
        data={importData}
        buttonLabel={"Import CSV Step"}
        successMessage={"Successfully imported EHR Data to the database."}
        stepName="importCsv"
      />
    </Box>
    // <Box dis>
    //   <h1>Import CSV</h1>
    //   <p>
    //     This step is responsible for importing EHR data into the database from the CSV files you
    //     have submitted earlier.
    //   </p>
    //   <p>
    //     Please make sure that all the column mappings you have provided are correct. They are
    //     displayed below.
    //   </p>

    //   {importData && <ImportSectionCards data={importData} />}

    //   <CallAPISection
    //     data={importData}
    //     buttonLabel={"Import CSV Step"}
    //     successMessage={"Successfully imported EHR Data to the database."}
    //     stepName="importCsv"
    //   />
    // </Box>
  );
};
