/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Events from "../pages/Events";
import Help from "../pages/Help";
import Team from "../pages/Team";
import EventsForm from "../components/EventsForm";
import HelpForm from "../components/HelpForm";
import EventDetails from "../pages/EventDetails";
import UpdateEvent from "../pages/UpdateEvent";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const authToken = localStorage.getItem("authToken");
  return authToken ? <Outlet /> : <Navigate to="/signIn" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/signIn", element: <SignIn /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/community-helps", element: <Help /> },
      { path: "/discover-events", element: <Events /> },
      {
        path: "/event/:id",
        element: <EventDetails />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_BASEURL}/event/${params.id}`),
      },
      // Protected Routes
      {
        element: <ProtectedRoute />, // Wrap protected routes with ProtectedRoute
        children: [
          { path: "/help-request", element: <HelpForm /> },
          { path: "/create-events", element: <EventsForm /> },
          { path: "/team", element: <Team /> },

          {
            path: "/update/:id",
            element: <UpdateEvent />,
            loader: ({ params }) =>
              fetch(`${import.meta.env.VITE_API_BASEURL}/event/${params.id}`),
          },
        ],
      },
    ],
  },
]);

export default router;
