import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../../../pages/login/ui/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Главная</div>
    },
    {
        path: "/login",
        element: <LoginPage/>
    }
]);