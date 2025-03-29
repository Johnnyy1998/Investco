import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeLayout from "./pages/HomeLayout";
import Landing from "./pages/Landing";
import Portfolio from "./pages/Portfolio";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        element: <Landing />,
        index: true,
      },
      {
        element: <Dashboard />,
        path: "/dashboard",
      },
      {
        element: <Login />,
        path: "/Login",
      },
      {
        element: <Signup />,
        path: "/signup",
      },
      {
        element: <Portfolio />,
        path: "/portfolio",
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
