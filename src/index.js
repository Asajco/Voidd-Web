import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppNavigation from "./AppNavigation";
import { AuthContextProvider } from "./store/auth-context";
import { BrowserRouter } from "react-router-dom" 

ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AppNavigation />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
