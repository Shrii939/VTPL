import Home from "../pages/Home";
import { createBrowserRouter } from "react-router-dom";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import OCR from "../pages/OCR";
import OnlineEditor from "../pages/OnlineEditor";


export const routers = createBrowserRouter([
    {
        path: "/",
        element:<LogIn/>,
    },
    {
        path: "/SignUp",
        element: <SignUp/>
    },
    {
        path: "/home",
        element: <Home/>
    },
    {
        path: "/ocr",
        element: <OCR/>
    },
    {
        path: "/OnlineEditor",
        element: <OnlineEditor/>
    }
]);