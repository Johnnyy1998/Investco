import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeLayout from "./pages/HomeLayout";
import Landing from "./pages/Landing";
import Portfolio from "./pages/Portfolio";
import ProtedctedRoute from "./Components/ProtedctedRoute";
import PortfolioValue from "./pages/PortfolioValue";
import About from "./pages/About";

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
        element: <About />,
        path: "/about",
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
        element: (
          <ProtedctedRoute>
            <Portfolio />
          </ProtedctedRoute>
        ),
        path: "/portfolio",
      },
      {
        element: (
          <ProtedctedRoute>
            <PortfolioValue />
          </ProtedctedRoute>
        ),
        path: "/portfolioValue",
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
