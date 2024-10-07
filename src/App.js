import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About, MainPage, StandardisePage } from "./pages";
import { StepDataContextProvider } from "./contexts/StepDataContext";
import { LayoutWithSideBar } from "./Components/LayoutWithSideBar/LayoutWithSideBar";
import { PreprocessPage } from "./pages/PreprocessingPage";
import { TabProvider } from "./contexts/TabContext";

function App() {
  return (
    <>
      <StepDataContextProvider>
        <TabProvider>
          <Router>
            <LayoutWithSideBar>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/standardise" element={<StandardisePage />} />
                <Route path="/preprocess" element={<PreprocessPage />} />
              </Routes>
            </LayoutWithSideBar>
          </Router>
        </TabProvider>
      </StepDataContextProvider>
    </>
  );
}

export default App;
