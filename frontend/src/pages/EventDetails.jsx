import React from "react";
import { GrLocation } from "react-icons/gr";
import { LuTimerReset } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const EventDetails = () => {
  const eventItem = useLoaderData();
  const navigate = useNavigate();
  const {
    _id,
    category,
    title,
    description,
    startTime,
    endTime,
    date,
    location,
    participants,
    requirements,
  } = eventItem || {};

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/event/${id}`
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
    navigate("/discover-events");
  };

  return (
    <div className="my-10 md:my-28">
      <div className="flex justify-between mx-auto items-center w-full">
        <Link
          to="/discover-events"
          className="flex items-center hover:text-black text-purple-600 font-medium text-xl gap-1 mb-5 md:mb-10"
        >
          <GoArrowLeft size={20} />
          Back to Events
        </Link>
        <div className="flex gap-2 md:gap-6 text-white md:font-medium">
          <Link
            to={`/update/${_id}`}
            className="bg-purple-500 text-sm px-4 gap-2 hover:bg-purple-600 rounded-lg py-2 flex items-center"
          >
            <FaRegEdit size={20} />
            Edit Event
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="bg-red-500 text-sm gap-2 hover:bg-red-600 px-4 rounded-lg py-2 flex items-center"
          >
            <RiDeleteBin4Line size={20} />
            Delete Event
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5 items-center md:max-w-screen-xl mx-auto">
        {/* Event Details */}
        <div className="md:w-[60%] w-full md:py-5 md:min-h-[350px]">
          <div className="flex items-center justify-between md:mb-10">
            <p className="flex items-center gap-2 text-xs md:text-base font-medium">
              <MdOutlineDateRange className="text-purple-600" size={18} /> Date
              : {new Date(date).toLocaleDateString() || "NA"}
            </p>
            <span className="px-2 md:px-4 py-2 text-center text-xs md:text-sm text-purple-500 bg-purple-50 rounded-lg font-medium">
              {category || "NA"}
            </span>
          </div>
          <div>
            <h1 className="mt-2 text-xl md:text-3xl font-semibold  text-black ">
              {title || "NA"}
            </h1>
            <h4 className="mt-6 text-xl font-medium text-black">
              Event Details
            </h4>
            <p
              title={description}
              className="mt-2 text-base md:text-lg  text-gray-600"
            >
              {description || "NA"}
            </p>
            <div className="flex items-center gap-5 my-4 md:my-8">
              <div className="space-y-1.5">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <LuTimerReset className="text-purple-600" size={18} /> Time :{" "}
                  {startTime || "NA"} to {endTime || "NA"}
                </p>
                <p className="flex items-center gap-2 text-sm font-medium">
                  <GrLocation className="text-purple-600" size={18} />
                  Location : {location || "NA"}
                </p>
              </div>
            </div>
            <p className="text-lg font-medium  text-black ">Requirements :</p>
            <p className="mt-2 text-base md:text-lg text-gray-600">
              {requirements || "NA"}
            </p>
          </div>
        </div>
        {/* Join event*/}
        <div className="md:w-[40%] w-full space-y-5 md:space-y-10 gap-3 p-3 md:p-6 flex flex-col justify-between md:min-h-[350px] bg-gray-50">
          <div className="bg-gray-100 rounded-lg p-4 md:p-6 flex items-center justify-between text-lg md:text-xl font-medium">
            <span>Participants</span>
            <span className="text-purple-700">{participants}</span>
          </div>
          <div>
            <h4 className="text-lg md:font-medium mb-2">What to Expect</h4>
            <div className="space-y-1.5">
              <p>Coordination and orientation upon arrival</p>
              <p>Opportunity to meet like-minded volunteers</p>
              <p>Certificate of participation for your volunteer hours</p>
            </div>
          </div>
          <button className="bg-purple-600 w-full hover:bg-purple-700  max-sm:text-xs md:font-medium text-white rounded-lg px-4 py-4">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
