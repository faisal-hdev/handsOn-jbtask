import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import HelpCard from "../components/HelpCard";

const Help = () => {
  const [helps, setHelps] = useState([]);
  console.log(helps);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_BASEURL}/helps`);
      setHelps(data);
    };
    getData();
  }, []);

  return (
    <div className="md:my-20 my-8 lg:my-32">
      <div className="text-black flex max-md:flex-col max-md:text-center justify-between items-center">
        <div className="flex flex-col w-full lg:w-2/3 text-black">
          <h1 className="text-2xl md:text-5xl font-bold leading-none">
            Help Request Community
          </h1>
        </div>
        <div className="flex items-center justify-center gap-x-6">
          <Link
            to="/help-request"
            className="transition flex items-center text-white px-4 justify-center gap-2 text-base py-3 rounded-lg font-semibold ease-in-out delay-150 bg-purple-500 max-md:mt-4 hover:bg-purple-600 duration-300"
          >
            Create Help post
            <MdKeyboardDoubleArrowRight size={20} />
          </Link>
        </div>
      </div>
      <div className="my-10 md:my-20">
        {/* Sorting events */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-5  my-10">
          <div>
            <select
              name="category"
              id="category"
              className=" text-black w-full px-4 py-2 md:py-3 bg-white border rounded-lg focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
            >
              <option value="">Choose a Urgency Level</option>
              <option value="Arts & Culture">Low</option>
              <option value="Disaster Relief">Medium</option>
              <option value="Environmental">Urgent</option>
            </select>
          </div>
          <div>
            <select
              name="category"
              id="category"
              className=" text-black w-full px-4 py-2 md:py-3 bg-white border rounded-lg focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
            >
              <option value="">Choose a Category</option>
              <option value="Environmental">Environmental </option>
              <option value="Disaster Relief">Disaster Relief</option>
              <option value="Arts & Culture">Arts & Culture</option>
              <option value="Animal Welfare">Animal Welfare</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Sports & Recreation">Sports & Recreation</option>
              <option value=" Education & Mentorship">
                Education & Mentorship
              </option>
              <option value="Advocacy & Human Rights">
                Advocacy & Human Rights
              </option>
              <option value="">Others</option>
            </select>
          </div>
          <button className="rounded-lg md:uppercase px-4 md:px-6 border border-purple-400 bg-slate-100 hover:bg-slate-200  text-black py-2 md:font-medium">
            Reset
          </button>
        </div>
        {/* Display help Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 md:my-12">
          {helps.map((helpItem) => (
            <HelpCard key={helpItem._id} helpItem={helpItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
