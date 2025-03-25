// import React from "react";

// import {
//   Navbar,
//   Collapse,
//   Typography,
//   IconButton,
// } from "@material-tailwind/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { Link } from "react-router-dom";

// function NavList() {
//   return (
//     <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-10">
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 md:text-base font-medium"
//       >
//         <Link
//           to="/"
//           className="flex items-center hover:text-purple-500 transition-colors"
//         >
//           Home
//         </Link>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 md:text-base font-medium"
//       >
//         <Link
//           to="/discover-events"
//           className="flex items-center hover:text-purple-500 transition-colors"
//         >
//           Discover Events
//         </Link>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 md:text-base font-medium"
//       >
//         <Link
//           to="/community-helps"
//           className="flex items-center hover:text-purple-500 transition-colors"
//         >
//           Community Help
//         </Link>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 md:text-base font-medium"
//       >
//         <Link
//           to="/team"
//           className="flex items-center hover:text-purple-500 transition-colors"
//         >
//           Team
//         </Link>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 md:text-base font-medium"
//       >
//         <Link
//           to="/signIn"
//           className="flex items-center bg-red300 px-4 p-2 border rounded-lg border-purple-400 hover:text-purple-500 transition-colors"
//         >
//           SignIn
//         </Link>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 md:text-base font-medium"
//       >
//         <Link
//           to="/signUp"
//           className="flex items-center bg-purple-500 rounded-lg hover:bg-purple-600 px-4 py-2 hover:text-purple700 text-white transition-colors"
//         >
//           SignUp
//         </Link>
//       </Typography>
//     </ul>
//   );
// }

// export function NavbarSimple() {
//   const [openNav, setOpenNav] = React.useState(false);

//   const handleWindowResize = () =>
//     window.innerWidth >= 960 && setOpenNav(false);

//   React.useEffect(() => {
//     window.addEventListener("resize", handleWindowResize);

//     return () => {
//       window.removeEventListener("resize", handleWindowResize);
//     };
//   }, []);

//   return (
//     <Navbar className=" text-black py-3 md:py-8 border-0 border-b-[2px] border-purple-300">
//       <div className="flex px-5 lg:px-0 w-full lg:max-w-7xl mx-auto items-center justify-between text-blue-gray-900">
//         <Typography
//           as="a"
//           href="/"
//           variant="h6"
//           className="mr-4 cursor-pointer py-1.5 font-bold text-xl md:text-2xl uppercase"
//         >
//           <h3 className="font-bold text-xl md:text-2xl lg:text-3xl uppercase">
//             Hands<span className="text-purple-500">O</span>n.
//           </h3>
//         </Typography>
//         <div className="hidden lg:block">
//           <NavList />
//         </div>
//         <IconButton
//           variant="text"
//           className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
//           ripple={false}
//           onClick={() => setOpenNav(!openNav)}
//         >
//           {openNav ? (
//             <XMarkIcon className="h-6 w-6" strokeWidth={2} />
//           ) : (
//             <Bars3Icon className="h-6 w-6" strokeWidth={2} />
//           )}
//         </IconButton>
//       </div>
//       <Collapse open={openNav}>
//         <NavList />
//       </Collapse>
//     </Navbar>
//   );
// }

import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

function NavList({ isAuthenticated, userName, handleLogout }) {
  return (
    <ul className="my-2 flex max-md:justify-center items-center flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-10">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 md:text-base font-medium"
      >
        <Link to="/">Home</Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 md:text-base font-medium"
      >
        <Link
          to="/discover-events"
          className="flex items-center hover:text-purple-500 transition-colors"
        >
          Discover Events
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 md:text-base font-medium"
      >
        <Link
          to="/community-helps"
          className="flex items-center hover:text-purple-500 transition-colors"
        >
          Community Help
        </Link>
      </Typography>
      {isAuthenticated && (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 md:text-base font-medium"
        >
          <Link
            to="/team"
            className="flex items-center hover:text-purple-500 transition-colors"
          >
            Team
          </Link>
        </Typography>
      )}
      {!isAuthenticated ? (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 md:text-base font-medium max-md:w-full"
          >
            <Link
              to="/signIn"
              className="flex items-center bg-red300 px-4 p-2 border rounded-lg border-purple-400 hover:text-purple-500 transition-colors"
            >
              Login
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 md:text-base font-medium max-md:w-full"
          >
            <Link
              to="/signUp"
              className="flex items-center bg-purple-500 rounded-lg hover:bg-purple-600 px-4 py-2 hover:text-purple700 text-white transition-colors"
            >
              Sign Up
            </Link>
          </Typography>
        </>
      ) : (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 md:text-base font-medium"
          >
            <span className="font-semibold">{userName}</span>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 md:text-base font-medium"
          >
            <Button
              onClick={handleLogout}
              size="sm"
              variant="outlined"
              className="rounded-full"
            >
              Logout
            </Button>
          </Typography>
        </>
      )}
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!token;
  const userName = user?.name || "";

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/signIn");
  };

  return (
    <Navbar className=" text-black z-50 py-3 md:py-8 border-0 border-b-[2px] border-purple-300">
      <div className="flex w-full lg:max-w-7xl mx-auto items-center justify-between text-blue-gray-900">
        <Typography className="mr4 cursor-pointer py-1.5 font-bold text-xl md:text-2xl uppercase">
          <Link
            to="/"
            className="font-bold text-xl md:text-2xl lg:text-3xl uppercase"
          >
            Hands<span className="text-purple-500">O</span>n.
          </Link>
        </Typography>
        <div className="hidden lg:block">
          <NavList
            isAuthenticated={isAuthenticated}
            userName={userName}
            handleLogout={handleLogout}
          />
        </div>
        <IconButton
          variant="text"
          className="ml-auto flex items-center justify-center h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList
          isAuthenticated={isAuthenticated}
          userName={userName}
          handleLogout={handleLogout}
        />
      </Collapse>
    </Navbar>
  );
}
