import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../Layout/Main";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
]);

export default router