import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/globalPopup.css";
import { Popup } from "./pages";
import { Router } from "react-chrome-extension-router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Popup />
    </Router>
  </React.StrictMode>
);
