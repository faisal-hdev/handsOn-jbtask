import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Events from "../pages/Events";
import Help from "../pages/Help";
import Team from "../pages/Team";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/signIn", element: <SignIn /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/discoverEvents", element: <Events /> },
      { path: "/communityHelp", element: <Help /> },
      { path: "/team", element: <Team /> },
    ],
  },
]);

export default router;
