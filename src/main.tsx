import React from "react";
import ReactDOM from "react-dom";

import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";

// Styles
import "styles/reset.css";
import "styles/index.css";
import "react-toastify/dist/ReactToastify.css";

// Providers
import { AuthProvider } from "providers/AuthProvider";
import { ThemeProvider } from "providers/ThemeProvider";

// Configuration
axios.defaults.baseURL = "http://localhost:5050/";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes />
          <ToastContainer
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="colored"
          />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
