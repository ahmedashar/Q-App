import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../views/Home";
// // import Login from "../views/Login";
import App from "../App";
import Login from "../views/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
