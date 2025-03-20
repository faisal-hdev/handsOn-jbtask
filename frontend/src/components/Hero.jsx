import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto py-16">
        <div className="relative isolate overflow-hidden px-6 pt-12 lg:pt-24 pb-16 lg:pb-36 text-center sm:rounded-3xl sm:px-16">
          <h2 className="font-nudge-extrabold mx-auto max-w-4xl text-3xl font-bold uppercase tracking-wide sm:text-6xl">
            Join Hands to Create Change
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-6 text-gray-600">
            Discover meaningful volunteer opportunities, connect with your
            community, and make a difference.
          </p>
          <div>
            <div className="isolate mt-8 flex items-center justify-center -space-x-2 overflow-hidden">
              <img
                className="relative z-30 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://randomuser.me/api/portraits/men/34.jpg"
                alt=""
              />
              <img
                className="relative z-20 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://randomuser.me/api/portraits/women/2.jpg"
                alt=""
              />
              <img
                className="relative z-10 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://randomuser.me/api/portraits/women/3.jpg"
                alt=""
              />
              <img
                className="relative z-0 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://randomuser.me/api/portraits/men/4.jpg"
                alt=""
              />
              <span className="max-sm:hidden !ml-2 font-bold italic text-purple-500">
                Join these awesome members
              </span>
            </div>
          </div>
          <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-6">
            <Link
              to="/discoverEvents"
              className="transition flex items-center text-white px-4 md:px-8 justify-center gap-2 text-base md:text-lg py-3 rounded-lg font-semibold ease-in-out delay-150 bg-purple-500 hover:-translate-y-1 hover:scale-110 hover:bg-purple-500 duration-300"
            >
              Explore Events
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="-mr-0.5 h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left- 1/2 top-[15%] -z-10 h-[72rem] w-[72rem] translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.1"
            ></circle>
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#9d4edd"></stop>
                <stop offset="1" stopColor="#9d4edd"></stop>
              </radialGradient>
            </defs>
          </svg>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left- 1/2 top-[15%] -z-10 h-[72rem] w-[72rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.1"
            ></circle>
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#9d4edd"></stop>
                <stop offset="1" stopColor="#9d4edd"></stop>
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
