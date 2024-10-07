import React from "react";

export const useComponentNavigation = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [disableNext, setDisableNext] = React.useState(false);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    setDisableNext(false);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setDisableNext(false);
  };

  const toggleDisableNext = (value: boolean) => {
    // setDisableNext(value);
  };

  return {
    currentStep,
    disableNext,
    nextStep,
    prevStep,
    toggleDisableNext,
  };
};
