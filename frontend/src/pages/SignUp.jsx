// import React from "react";
// import { Link } from "react-router-dom";
// import loginBg from "../assets/images/register.jpg";
// import logo from "../assets/images/logo1.png";

// const SignUp = () => {
//   return (
//     <div className="flex justify-center items-center my-6 md:my-14 lg:my-40">
//       <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl ">
//         <div className="w-full px-6 py-8 md:px-8 lg:w-[65%]">
//           <div className="flex justify-center mx-auto">
//             <img className="w-auto h-8 lg:h-12" src={logo} alt="" />
//           </div>
//           <p className="font-medium text-center text-xl md:text-2xl my-5">
//             Get Your Free Account Now.
//           </p>
//           <div className="flex items-center justify-between mt-4">
//             <span className="w-1/5 border-b border-black  lg:w-1/4"></span>
//             <div className="text-xs text-center text-black uppercase  hover:underline">
//               or Registration with email
//             </div>
//             <span className="w-1/5 border-b border-black lg:w-1/4"></span>
//           </div>
//           <form
//           // onSubmit={handleSignUp}
//           >
//             <div className="mt-4">
//               <label
//                 className="block mb-2 text-sm font-medium text-black-600 "
//                 htmlFor="name"
//               >
//                 Username
//               </label>
//               <input
//                 required
//                 name="name"
//                 className="block w-full px-4 py-2 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
//                 type="text"
//               />
//             </div>
//             <div className="mt-4">
//               <label
//                 className="block mb-2 text-sm font-medium text-black-600 "
//                 htmlFor="LoggingEmailAddress"
//               >
//                 Email Address
//               </label>
//               <input
//                 required
//                 name="email"
//                 className="block w-full px-4 py-2 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
//                 type="email"
//               />
//             </div>

//             <div className="mt-4">
//               <div className="flex justify-between">
//                 <label
//                   className="block mb-2 text-sm font-medium text-black-600 "
//                   htmlFor="loggingPassword"
//                 >
//                   Password
//                 </label>
//               </div>

//               <input
//                 required
//                 autoComplete="current-password"
//                 name="password"
//                 className="block w-full px-4 py-2 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
//                 type="password"
//               />
//             </div>
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="w-full px-6 py-3 text-sm lg:text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-600 rounded-lg hover:bg-purple-700 "
//               >
//                 Sign Up
//               </button>
//             </div>
//           </form>
//           <div className="flex items-center justify-between mt-4">
//             <span className="w-1/5 border-b  md:w-1/4"></span>

//             <Link
//               to="/signIn"
//               className="text-xs md:text-sm text-black-500 font-medium hover:underline"
//             >
//               Already have an account? SignIn
//             </Link>

//             <span className="w-1/5 border-b  md:w-1/4"></span>
//           </div>
//         </div>
//         <div
//           className="hidden bg-cover bg-center lg:block lg:w-1/2"
//           style={{
//             backgroundImage: `url(${loginBg})`,
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../assets/images/login.jpg";
import logo from "../assets/images/logo1.png";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState([]);
  const [causes, setCauses] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [causeInput, setCauseInput] = useState("");

  const navigate = useNavigate();

  const handleAddSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const handleAddCause = () => {
    if (causeInput && !causes.includes(causeInput)) {
      setCauses([...causes, causeInput]);
      setCauseInput("");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
        skills,
        supported_causes: causes,
      });

      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/signIn");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center my-6 md:my-14 lg:my-20">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        <div
          className="hidden bg-cover bg-center text-purple-800 lg:block lg:w-1/2"
          style={{ backgroundImage: `url(${loginBg})` }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-[65%]">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-8 lg:h-12" src={logo} alt="Logo" />
          </div>
          <h3 className="font-medium text-center text-xl md:text-2xl my-5">
            Create Your Account
          </h3>

          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-4 py-2 my-2 border rounded-lg"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-2 my-2 border rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-4 py-2 my-2 border rounded-lg"
            />

            <div className="my-2">
              <label className="text-sm font-semibold">Add Skill:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="flex-grow px-2 py-1 border rounded"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-3 py-1 bg-purple-600 text-white rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap mt-2 gap-2">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="bg-purple-100 px-2 py-1 rounded text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="my-2">
              <label className="text-sm font-semibold">Add Cause:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={causeInput}
                  onChange={(e) => setCauseInput(e.target.value)}
                  className="flex-grow px-2 py-1 border rounded"
                />
                <button
                  type="button"
                  onClick={handleAddCause}
                  className="px-3 py-1 bg-purple-600 text-white rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap mt-2 gap-2">
                {causes.map((c, i) => (
                  <span
                    key={i}
                    className="bg-purple-100 px-2 py-1 rounded text-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b md:w-1/4"></span>
            <Link
              to="/signIn"
              className="text-xs md:text-sm font-medium text-black hover:underline"
            >
              Already have an account? Sign In
            </Link>
            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
