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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/team", element: <Team /> },
      { path: "/signIn", element: <SignIn /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/community-helps", element: <Help /> },
      { path: "/discover-events", element: <Events /> },
      { path: "/help-request", element: <HelpForm /> },
      { path: "/create-events", element: <EventsForm /> },
      {
        path: "/event/:id",
        element: <EventDetails />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/event/${params.id}`),
      },
    ],
  },
]);

export default router;
