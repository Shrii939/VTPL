import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomeComponent from "./components/HomeComponent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routers } from "./Routers/routers";
import { ToastContainer, toast } from 'react-toastify';
import  'react-toastify/dist/ReactToastify.css' ;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <ToastContainer/>
     <RouterProvider router={routers}></RouterProvider>
  </React.StrictMode>
);
