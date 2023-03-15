import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import UpdateDonor from "../pages/UpdateDonor";

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>
    },
    {
        path: '/updateDonor/:id',
        element: <UpdateDonor></UpdateDonor>
    }
])