import React from "react";

interface StepData {
  [key: string]: any;
}

interface StepDataContextType {
  stepData: StepData;
  updateStepData: (sectionName: string, data: StepData) => void;
}

const StepDataContext = React.createContext<StepDataContextType>({
  stepData: {},
  updateStepData: () => {},
});

interface StepDataContextProviderProps {
  children: React.ReactNode;
}

const StepDataContextProvider: React.FC<StepDataContextProviderProps> = ({ children }) => {
  const [stepData, setStepData] = React.useState<StepData>({});

  const updateStepData = (sectionName: string, data: any) => {
    setStepData((prevStepData) => ({
      ...prevStepData,
      [sectionName]: data,
    }));
  };

  return (
    <StepDataContext.Provider value={{ stepData, updateStepData }}>
      {children}
    </StepDataContext.Provider>
  );
};

export { StepDataContext, StepDataContextProvider };
