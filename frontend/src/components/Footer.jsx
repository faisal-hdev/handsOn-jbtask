import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-black border-0 border-purple-300 border-t-2">
      <div className="px-5 lg:px-0 w-full lg:max-w-7xl mx-auto py-20">
        <div className="flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
          <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
            <Link to="/">
              <h3 className="font-bold text-xl md:text-2xl uppercase">
                Hands<span className="text-purple-500">O</span>n.
              </h3>
            </Link>
            <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
              <li>
                <a rel="noopener noreferrer">Terms of Use</a>
              </li>
              <li>
                <a rel="noopener noreferrer">Privacy</a>
              </li>
            </ul>
          </div>
          <ul className="max-sm:hidden flex flex-wrap cursor-pointer pl-3 space-x-4 sm:space-x-8">
            <li>
              <a rel="noopener noreferrer">Instagram</a>
            </li>
            <li>
              <a rel="noopener noreferrer">Facebook</a>
            </li>
            <li>
              <a rel="noopener noreferrer">Twitter</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
