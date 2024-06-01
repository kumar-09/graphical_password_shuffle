import logo from "./logo.svg";
import "./App.css";
import Imagepassword from "./screens/image-password";
import Success from "./screens/success";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Verified from "./screens/verified";
import ErrorC from "./screens/error";
import Name from "./screens/name";
import { ToastContainer } from "react-toastify";
import CelebGraphicalPassword from "./screens/logs"
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Name />,
  },
  {
    path: "/ip",
    element: <Imagepassword />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/error",
    element: <ErrorC />,
  },
  {
    path: "/verified",
    element: <Verified />,
  },
  {
    path: "/logs",
    element: <CelebGraphicalPassword />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
