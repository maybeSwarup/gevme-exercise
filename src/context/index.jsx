import React, { useContext, useState, createContext } from "react";
import { defaultValues } from "../utils";

const AppContext = createContext();

export default function useAppContext() {
  return useContext(AppContext);
}

export const initialState = {
  snackbar: { open: false },
};

export const AppContextProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState(initialState.snackbar);

  function openSnackbar(severity, message) {
    // console.log("openSnackbar", snackbarProps);
    setSnackbar({
      ...defaultValues.snackbar,
      severity,
      message,
    });
  }

  const value = {
    snackbar,
    setSnackbar,
    openSnackbar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
