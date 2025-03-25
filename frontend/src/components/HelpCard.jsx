import React from "react";
import { GrLocation } from "react-icons/gr";
import { MdOutlineDateRange } from "react-icons/md";
import { BiPhoneCall } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";

const HelpCard = ({ helpItem }) => {
  const {
    _id,
    title,
    category,
    location,
    number,
    date,
    description,
    urgencyLevel,
  } = helpItem || {};

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_BASEURL}/help/${id}`
      );
      console.log(data);
      toast.success("Deleted successfully", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex max-md:flex-col flex-row-reverse p-2 md:p-4 md:gap-6 justify-between border rounded-lg bg-white border-gray-300">
      <div className="w-full md:w-[30%] flex max-md: md:flex-col items-end justify-between">
        <button
          onClick={() => handleDelete(_id)}
          className="bg-gray-50 text-red-500 hover:bg-red-400  max-sm:text-xs md:font-normal hover:text-white rounded-lg p-2"
        >
          <RiDeleteBin5Line size={18} />
        </button>
        <div>
          <button className="bg-purple-600 hover:bg-purple-700 max-md:text-xs md:text-xs lg:text-base text-white rounded-lg px-4 py-2">
            Offer Help
          </button>
        </div>
      </div>
      {/* Card body */}
      <div className="space-y-2 md:space-y-4 w-full md:w-[70%]">
        <h3 title={title} className="text-xl font-medium">
          {title.substring(0, 70)}....
        </h3>
        <h3
          className={`text-center w-[20%] text-xs md:text-sm border-0 rounded-br-lg rounded-tl-lg bg-gray200 py-1 px-2 ${
            urgencyLevel === "Low" && "text-blue-500 bg-blue-100/60"
          } ${
            urgencyLevel === "Medium" && "text-emerald-500 bg-emerald-100/60"
          } ${
            urgencyLevel === "Urgent" && "text-pink-500 bg-pink-100/60"
          } md:font-medium`}
        >
          {urgencyLevel || "NA"}
        </h3>
        <p title={description} className="text-base">
          {description.substring(0, 70)}....
        </p>
        <p className="text-xs font-medium text-purple-500">{category}</p>
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-sm font-medium">
            <MdOutlineDateRange className="text-purple-600" size={18} /> Date :{" "}
            {new Date(date).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2 text-sm font-medium">
            <GrLocation className="text-purple-600" size={18} />
            Location : {location}
          </p>
          <p className="flex items-center gap-2 text-sm font-medium">
            <BiPhoneCall className="text-purple-600" size={18} />
            Number : {number}
          </p>
        </div>
        <p className="text-base">Posted by : Static person</p>
      </div>
    </div>
  );
};

export default HelpCard;
