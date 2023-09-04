import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app";

const root = createRoot(document.getElementById("root")!); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
