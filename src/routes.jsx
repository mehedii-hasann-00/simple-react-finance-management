import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import MyProfile from "./pages/MyProfile";
import ErrorPage from "./pages/ErrorPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";
import AddTransaction from "./pages/AddTransaction";
import MyTransactions from "./pages/MyTransaction";
import Reports from "./pages/Reports";
import Update from "./pages/Update";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "add-transaction",
                element: (
                    <PrivateRoute>
                        <AddTransaction />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-transactions",
                element: (
                    <PrivateRoute>
                        <MyTransactions />
                    </PrivateRoute>
                ),
            },
                        {
                path: "update/:id",
                element: (
                    <PrivateRoute>
                        <Update />
                    </PrivateRoute>
                ),
            },
            {
                path: "reports",
                element: (
                    <PrivateRoute>
                        <Reports />
                    </PrivateRoute>
                ),
            },
            { path: "profile", element: <MyProfile /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
        ]
    }
]);
