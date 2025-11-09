
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppsProvider } from "./AppsContext";
import { router } from "./routes";


createRoot(document.getElementById("root")).render(
  <AppsProvider>
    <RouterProvider router={router} />
  </AppsProvider>
);
