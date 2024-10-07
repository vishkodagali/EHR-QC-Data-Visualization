import React, { createContext, useState, useContext } from "react";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return <TabContext.Provider value={{ tabIndex, setTabIndex }}>{children}</TabContext.Provider>;
};

export const useTab = () => useContext(TabContext);
