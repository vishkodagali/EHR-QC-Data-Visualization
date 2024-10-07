import React, { useMemo } from "react";
import { StepDataContext } from "../../../contexts/StepDataContext";
import { getCheckedData } from "../../../utils/getStandardiseJSON";
import { CallAPISection } from "../CallAPISection";
import { Box, Typography } from "@mui/material";

export const PerformETL = () => {
  const { stepData } = React.useContext(StepDataContext);

  // get the data which are checked from importConfigSection.
  const importData = useMemo(() => getCheckedData(stepData.import), [stepData.import]);

  // TODO:
  // return the whole etl, with data on the patients, admissions etc

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ pt: 3, gap: 2, maxWidth: `100%` }}
    >
      <Typography variant="h3">Perform ETL</Typography>
      <Typography variant="body1">Executing the migration process </Typography>

      <CallAPISection
        data={importData}
        buttonLabel={"Perform ETL Step"}
        successMessage={"Successfully migrated."}
        stepName="performETL"
      />
    </Box>
  );
};
