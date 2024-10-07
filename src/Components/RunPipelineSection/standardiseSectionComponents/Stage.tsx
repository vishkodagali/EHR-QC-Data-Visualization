import React, { useMemo } from "react";
import usePolling from "../../../hooks/usePolling";
import { StepDataContext } from "../../../contexts/StepDataContext";
import { getCheckedData, getStandardiseJSON } from "../../../utils/getStandardiseJSON";
import { Button, Spinner, Alert } from "react-bootstrap";
import { CallAPISection } from "../CallAPISection";
import { Box, Typography } from "@mui/material";

export const Stage = () => {
  const { stepData } = React.useContext(StepDataContext);

  // get the data which are checked from importConfigSection.
  const importData = useMemo(() => getCheckedData(stepData.import), [stepData.import]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      sx={{ pt: 3, gap: 2, maxWidth: `100%` }}
    >
      <Typography variant="h3">Stage</Typography>
      <Typography variant="body1">Staging the data within staging tables</Typography>

      <CallAPISection
        data={importData}
        buttonLabel={"Staging Data Step"}
        successMessage={"Successfully staged the data based on your configuration."}
        stepName="stage"
      />
    </Box>
  );
};
