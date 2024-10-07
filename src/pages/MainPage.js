import React from "react";
import { Button, IconButton } from "@mui/material";
import ImportConfigSection from "../Components/import/ImportConfigSection";
import { useComponentNavigation } from "../hooks/useComponentNavigation";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import {
  ImportCSV,
  Stage,
  ImportConceptMapping,
  PerformETL,
  ConceptCoverage,
  Extract,
  DataCoverageAnalysis,
} from "../Components/RunPipelineSection";

import Box from "@mui/material/Box";

const FrontPage = () => {
  const getUserUUID = () => {
    let userUUID = localStorage.getItem("userUUID");

    if (!userUUID) {
      userUUID = uuidv4();
      localStorage.setItem("userUUID", userUUID);
    }

    return userUUID;
  };

  const userUUID = getUserUUID();

  const { currentStep, nextStep, prevStep, disableNext, toggleDisableNext } =
    useComponentNavigation();
  const steps = [
    <></>,
    <ImportConfigSection toggleDisableNext={toggleDisableNext} />,
    <ImportCSV />,
    <Stage />,
    <ImportConceptMapping />,
    <PerformETL />,
    <ConceptCoverage />,
    <Extract />,
    <DataCoverageAnalysis />,
  ];
  const renderSteps = () => {
    if (currentStep === 0) {
      return null;
    }

    return <>{steps[currentStep]}</>;
  };

  const numSteps = steps.length - 1;

  return (
    <>
      <Box
        height="100%"
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
        sx={{ p: 3 }}
      >
        {currentStep === 0 && (
          <Button variant="contained" onClick={nextStep}>
            Start
          </Button>
        )}
        {renderSteps()}
        <div className="p-3">
          {currentStep > 0 && (
            // <Button variant="contained" disableElevation onClick={prevStep} >
            //   <IoMdArrowRoundBack />
            // </Button>
            <IconButton onClick={prevStep}>
              <IoMdArrowRoundBack />
            </IconButton>
          )}
          {currentStep > 0 && currentStep < numSteps && (
            // <Button variant="contained" disableElevation onClick={nextStep} disabled={disableNext}>
            //   <IoMdArrowRoundForward />
            // </Button>
            <IconButton onClick={nextStep} disabled={disableNext}>
              <IoMdArrowRoundForward />
            </IconButton>
          )}
        </div>
      </Box>
    </>
  );
};

export default FrontPage;
