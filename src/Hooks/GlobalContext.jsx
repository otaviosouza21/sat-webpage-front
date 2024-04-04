import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
const [update,setUpdate] = useState(false)

  return <GlobalContext.Provider
  value={{
    update,
    setUpdate
  }}>{children}</GlobalContext.Provider>;
};
