import React from "react";
import ReactDOM from "react-dom/client";
import AppProvider from "./AppContext";
import App from "./App";
import "./_main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
