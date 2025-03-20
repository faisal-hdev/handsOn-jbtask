import React from "react";
import { Link } from "react-router-dom";
import loginBg from "../assets/images/register.jpg";
import logo from "../assets/images/logo1.png";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center my-6 md:my-14 lg:my-40">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl ">
        <div className="w-full px-6 py-8 md:px-8 lg:w-[65%]">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-8 lg:h-12" src={logo} alt="" />
          </div>
          <p className="font-medium text-center text-xl md:text-2xl my-5">
            Get Your Free Account Now.
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b border-black  lg:w-1/4"></span>
            <div className="text-xs text-center text-black uppercase  hover:underline">
              or Registration with email
            </div>
            <span className="w-1/5 border-b border-black lg:w-1/4"></span>
          </div>
          <form
          // onSubmit={handleSignUp}
          >
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-black-600 "
                htmlFor="name"
              >
                Username
              </label>
              <input
                required
                name="name"
                className="block w-full px-4 py-2 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
                type="text"
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-black-600 "
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                required
                name="email"
                className="block w-full px-4 py-2 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
                type="email"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-black-600 "
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
              </div>

              <input
                required
                autoComplete="current-password"
                name="password"
                className="block w-full px-4 py-2 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
                type="password"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm lg:text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-600 rounded-lg hover:bg-purple-700 "
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  md:w-1/4"></span>

            <Link
              to="/signIn"
              className="text-xs md:text-sm text-black-500 font-medium hover:underline"
            >
              Already have an account? SignIn
            </Link>

            <span className="w-1/5 border-b  md:w-1/4"></span>
          </div>
        </div>
        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{
            backgroundImage: `url(${loginBg})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default SignUp;
