import { Link } from "react-router-dom";
import HorizontalLinearStepper from "../Components/HorizontalLinearStepper/HorizontalLinearStepper";
import ImportConfigSection from "../Components/import/ImportConfigSection";
import {
  ImportCSV,
  Stage,
  ImportConceptMapping,
  PerformETL,
} from "../Components/RunPipelineSection";
import { Box, Typography } from "@mui/material";

export const StandardisePage = () => {
  const renderIntroduction = () => {
    return (
      <Box display={"flex"} flexDirection={"column"} textAlign={"center"} sx={{ pt: 3, gap: 2 }}>
        <Typography variant="h3">Standardise</Typography>
        <Typography variant="body1">
          The standardise pipeline is responsible for standardising your data. You will need to
          follow the steps in order to complete standardising.
        </Typography>
        <Typography variant="body1">Please proceed to the next step when ready.</Typography>
      </Box>
    );
  };

  const renderStandardiseFinish = () => {
    return (
      <Box display={"flex"} flexDirection={"column"} textAlign={"center"} sx={{ pt: 3, gap: 2 }}>
        <Typography variant="body1">Thank you for completing the standardise pipeline.</Typography>
        <Typography variant="body1">
          You can now start the Preprocessing pipeline <Link to="/preprocess">here</Link>
        </Typography>
      </Box>
    );
  };

  const steps = [
    "Start",
    "Import your configs",
    "ImportCSV",
    "Stage",
    "Import Concept Mapping",
    "Perform ETL",
  ];

  const renderComponentSteps = [
    <>{renderIntroduction()}</>,
    <ImportConfigSection />,
    <ImportCSV />,
    <Stage />,
    <ImportConceptMapping />,
    <PerformETL />,
  ];

  return (
    <Box sx={{ height: "100%" }}>
      <HorizontalLinearStepper
        steps={steps}
        renderComponentSteps={renderComponentSteps}
        renderFinishComponent={renderStandardiseFinish}
      />
    </Box>
  );
};
