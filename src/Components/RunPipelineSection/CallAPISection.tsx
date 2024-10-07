import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import usePolling from "../../hooks/usePolling";
import { getStandardiseJSON } from "../../utils/getStandardiseJSON";
import { Box, LinearProgress } from "@mui/material";

interface ICallAPISectionProps {
  data: any;
  buttonLabel: string;
  successMessage: string;
  stepName: string;
}

export const CallAPISection = ({
  data,
  buttonLabel,
  successMessage,
  stepName,
}: ICallAPISectionProps) => {
  const { isPolling, success, error, callAPI, resetSuccess, response } = usePolling();
  const errorMessage = "Error has occured, please check configurations and try again.";
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          resetSuccess();
          callAPI(
            "http://localhost:5000/standardise/" + stepName,
            "POST",
            getStandardiseJSON(data)
          );
        }}
      >
        {buttonLabel}
      </Button>
      {isPolling && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {!isPolling && success && (
        <Alert severity="success">{successMessage} You can proceed to the next step.</Alert>
      )}
      {error && <Alert severity="error">{errorMessage}</Alert>}
      {/* { only show response if the function is performETL} */}
      {response && stepName === "performETL" && (
        <>
          {Object.keys(response[1]).map((category: any) => {
            return (
              <>
                <p>
                  {category} rows: {response[1][category]}
                </p>
              </>
            );
          })}
        </>
      )}
    </>
  );
};
