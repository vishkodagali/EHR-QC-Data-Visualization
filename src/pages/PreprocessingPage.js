import { Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import {
  ConceptCoverage,
  DataCoverageAnalysis,
  Extract,
  Impute,
  Outliers,
  Graphing,
} from "../Components/RunPipelineSection";
import { useTab } from "../contexts/TabContext";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const PreprocessPage = () => {
  const { tabIndex, setTabIndex } = useTab();

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  const renderIntroduction = () => {
    return (
      <Box display={"flex"} flexDirection={"column"} textAlign={"center"} sx={{ pt: 3, gap: 2 }}>
        <Typography variant="h3">Preprocess</Typography>
        <Typography variant="body1">
          The Preprocess pipeline is responsible for standardising your data. You will need to
          follow the steps in order to complete standardising.
        </Typography>
        <Typography variant="body1">Please proceed to the next step when ready.</Typography>
      </Box>
    );
  };

  const steps = [
    "Introduction",
    "Concept Coverage",
    "Extract",
    "Data Coverage Analysis",
    "Imputing",
    "Outliers",
    "Graphing",
  ];

  const renderComponentSteps = [
    <>{renderIntroduction()}</>,
    <ConceptCoverage />,
    <Extract />,
    <DataCoverageAnalysis />,
    <Impute />,
    <Outliers />,
    <Graphing />,
  ];

  return (
    <Box>
      <Box sx={{ height: "100%", width: "100%", bgcolor: "background.paper" }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          scrollButtons="auto"
          centered={!isMobile}
          variant={isMobile ? "fullWidth" : "standard"}
        >
          {steps.map((step) => (
            <Tab key={step} label={step} />
          ))}
        </Tabs>
      </Box>
      {renderComponentSteps.map((step, index) => (
        <TabPanel key={index} value={tabIndex} index={index}>
          {step}
        </TabPanel>
      ))}
    </Box>
  );
};
