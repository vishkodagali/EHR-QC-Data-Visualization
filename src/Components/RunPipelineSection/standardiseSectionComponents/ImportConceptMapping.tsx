import React, { useMemo } from "react";
import { CallAPISection } from "../CallAPISection";
import { StepDataContext } from "../../../contexts/StepDataContext";
import { getCheckedData } from "../../../utils/getStandardiseJSON";
import { Box, Typography } from "@mui/material";
import { ImportSectionCards } from "../../import/ImportSectionCards";

export const ImportConceptMapping = () => {
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
      <Typography variant="h3">Import Concept Mapping</Typography>
      <Typography variant="body1">
        Integrating custom concept mappings for concepts that deviate from the standard
      </Typography>

      <CallAPISection
        data={importData}
        buttonLabel={"Import Concept Mapping Data Step"}
        successMessage={"Successfully imported the concept mapping provided."}
        stepName="importConceptMapping"
      />
    </Box>
  );
};
