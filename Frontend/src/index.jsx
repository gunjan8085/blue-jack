import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import "jsvectormap/dist/css/jsvectormap.css";
import "react-toastify/dist/ReactToastify.css";
import "react-modal-video/css/modal-video.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App";
import AuthProvider from "@contexts/AuthContext";
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Toaster />
    <AuthProvider>
      <App />
    </AuthProvider>
  </>
);
