
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppsProvider } from "./AppsContext";
import { router } from "./routes";
import './index.css';

createRoot(document.getElementById("root")).render(
  <AppsProvider>
    <RouterProvider router={router} />
  </AppsProvider>
);
