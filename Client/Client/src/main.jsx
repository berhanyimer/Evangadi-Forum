import React from "react";
import ReactDom from 'react-dom/client'
import { createRoot } from "react-dom/client"; // Correct import for React 18
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Create a root container
const container = document.getElementById("root");
const root = createRoot(container); // Initialize the React 18 root

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
