import Home from "../pages/Home";
import { createBrowserRouter } from "react-router-dom";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";


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
    }
]);