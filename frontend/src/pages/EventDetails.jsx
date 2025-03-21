import React from "react";
import { GrLocation } from "react-icons/gr";
import { LuTimerReset } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

const EventDetails = () => {
  const eventItem = useLoaderData();
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
  return (
    <div className="my-10 md:my-28">
      <Link
        to="/discover-events"
        className="flex items-center hover:text-black text-purple-600 font-medium text-xl gap-1 mb-5 md:mb-10"
      >
        <GoArrowLeft size={20} />
        Back to Events
      </Link>
      <div className="flex flex-col md:flex-row justify-between gap-5 items-center md:max-w-screen-xl mx-auto">
        {/* Event Details */}
        <div className="md:w-[60%] w-full md:p-5  md:min-h-[350px]">
          <div className="flex items-center justify-between md:mb-10">
            <p className="flex items-center gap-2 text-xs md:text-base font-medium">
              <MdOutlineDateRange className="text-purple-600" size={18} /> Date
              : {new Date(date).toLocaleDateString() || "NA"}
            </p>
            <span className="px-2 md:px-4 py-2 text-center text-xs md:text-sm text-purple-800 bg-purple-100 rounded-lg font-medium">
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
