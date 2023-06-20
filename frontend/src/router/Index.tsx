import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../Pages/Home";
import Category from "../Pages/Category";
import { Search } from "../components/icons";
import Settings from "../Pages/Settings";
import PersonalizedNewsFeed from "../Pages/PersonalizedNewsFeed";
import Register from "../Pages/Register";
import Login from "../Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:category",
        element: <Category />,
      },
      {
        path: "/search/:title",
        element: <Search />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/newsfeed",
        element: <PersonalizedNewsFeed />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
