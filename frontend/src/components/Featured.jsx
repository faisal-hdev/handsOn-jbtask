import React from "react";
import { CardWithLink } from "./CardWithLink";

const Featured = () => {
  return (
    <section className="pt-12 lg:pt-24 pb-16 lg:pb-28">
      <div className="flex flex-col mx-auto lg:flex-row">
        <div className="flex flex-col w-full p6 lg:w-2/3 md:p8 lg:p12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-8 h-10 mb-4 dark:text-violet-600"
          >
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <h1 className="text-xl md:text-5xl font-bold leading-none">
            Trending Volunteer Events
          </h1>
          <p className="mt-4 mb-8 text-xl text-gray-600">
            Check out the most popular events and initiatives happening near
            you.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <CardWithLink />
        <CardWithLink />
        <CardWithLink />
        <CardWithLink />
        <CardWithLink />
        <CardWithLink />
      </div>
    </section>
  );
};

export default Featured;
