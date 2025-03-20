import React from "react";
import { Link } from "react-router-dom";

const CallAction = () => {
  return (
    <section>
      <div className="flex flex-col mx-auto lg:flex-row max-sm:mb-10 md:pb-14">
        <div className="flex flex-col w-full bgred-200 text-center lg:w-2/3 mx-auto ">
          <h1 className="text-xl md:text-5xl font-bold leading-none">
            Ready to Make a Difference?
          </h1>
          <p className="mt-4 mb-8 text-xl text-gray-600">
            Join HandsOn today and start creating impact in your community.
          </p>
          <div className="flex gap-5 justify-center">
            <Link
              to="/signUp"
              className="bg-purple-500 md:text-lg rounded-lg hover:bg-purple-600 px-6 md:font-medium py-2 hover:text-purple700 text-white transition-colors"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallAction;
