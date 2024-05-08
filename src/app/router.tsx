import {createBrowserRouter} from "react-router-dom";
import Register from "./pages/Register";
import Main from "./pages/main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: '/auth/register',
    element: <Register />
  },
]);
