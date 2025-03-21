import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../assets/images/login.jpg";
import logo from "../assets/images/logo1.png";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function for email and password
  // const validateForm = () => {
  //   const errors = {};
  //   if (!email) {
  //     errors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(email)) {
  //     errors.email = "Please enter a valid email address";
  //   }
  //   if (!password) {
  //     errors.password = "Password is required";
  //   }
  //   return errors;
  // };

  // Handle form submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(email, password);

    // Validate form fields
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }

    try {
      // Make API request to login
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        console.log(response);

        alert.success("Login successful!");
        // Redirect or save token as needed
        const token = response.data.token;
        console.log(token);

        sessionStorage.setItem("authToken", token);
        navigate("/homeScreen");
        fetchUserDetails();
      } else {
        alert.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert.error(
        error.response.data.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  // useEffect(() => {
  // }, []);
  const fetchUserDetails = async () => {
    try {
      // Retrieve token from localStorage or other secure storage
      const token = sessionStorage.getItem("authToken"); // Replace with actual token retrieval
      console.log(token);

      if (!token) {
        // setError('User is not logged in');
        return;
      }
      // Make the API request with the token in the Authorization header
      const response = await axios.get(
        "http://localhost:3000/api/auth/get-userDetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        console.log(response.data.user);
      } else {
        console.log(response.data.message || "Failed to fetch user details");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      console.log(err.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className="flex justify-center items-center my-6 md:my-14 lg:my-40">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl ">
        <div
          className="hidden bg-cover bg-center text-purple-800 lg:block lg:w-1/2"
          style={{
            backgroundImage: `url(${loginBg})`,
          }}
        ></div>
        <div className="w-full px-6 py-8 md:px-8 lg:w-[65%]">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-8 lg:h-12" src={logo} alt="" />
          </div>
          <h3 className="font-medium text-center text-xl md:text-2xl my-5">
            Please Sign In
          </h3>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b border-black lg:w-1/4"></span>

            <div className="text-xs text-center text-black uppercase  hover:underline">
              or login with email
            </div>

            <span className="w-1/5 border-b border-black lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSignIn}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-black ">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 text-black bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-black ">
                  Password
                </label>
              </div>

              <input
                required
                type="password"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 text-black bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm lg:text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-600 rounded-lg hover:bg-purple-700 "
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  md:w-1/4"></span>

            <Link
              to="/signUp"
              className="text-xs md:text-sm font-medium text-black hover:underline"
            >
              Or Create One? SignUp
            </Link>

            <span className="w-1/5 border-b  md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
