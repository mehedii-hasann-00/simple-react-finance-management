import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Plants from "./pages/Plants";
import PlantsDetails from "./pages/PlantsDetails";
import MyProfile from "./pages/MyProfile";
import ErrorPage from "./pages/ErrorPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "plants", element: <Plants /> },
      // { path: "plants/:id", element: <PlantsDetails /> },
      {
        path: "plants/:id",
        element: (
          <PrivateRoute>
            <PlantsDetails />
          </PrivateRoute>
        ),
      },
      { path: "profile", element: <MyProfile /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ]
  }
]);
