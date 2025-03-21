import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { IoPeopleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const EventCard = ({ eventItem }) => {
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
  } = eventItem || {};
  return (
    <div className="w-full flex flex-col justify-between border rounded-lg bg-white border-gray-300">
      <div className="bg-purple- 100 pb-10">
        <h3 className="text-center text-sm border-0 rounded-br-lg rounded-tl-lg bg-gray-200 p-2 w-1/2 text-purple-600 font-medium">
          {category}
        </h3>
      </div>
      {/* Card body */}
      <div className="px-6 pb-6 space-y-4 md:space-y-8">
        <h3 title={title} className="text-xl font-medium">
          {title.substring(0, 70)}....
        </h3>
        <p title={description} className="text-base">
          {description.substring(0, 70)}....
        </p>
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-sm font-medium">
            <MdOutlineDateRange className="text-purple-600" size={18} /> Date :{" "}
            {new Date(date).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2 text-sm font-medium">
            <LuTimerReset className="text-purple-600" size={18} /> Time :{" "}
            {startTime} to {endTime}
          </p>
          <p className="flex items-center gap-2 text-sm font-medium">
            <GrLocation className="text-purple-600" size={18} />
            Location : {location}
          </p>
        </div>
        <p className="flex items-center gap-2 text-sm font-medium">
          <IoPeopleOutline className="text-purple-600" size={18} />
          Participants : {participants}
        </p>
        <div className="flex gap-2 md:gap-4 flex-col md:flex-row-reverse justify-between">
          <Link
            to={`/event/${_id}`}
            className=" border text-center border-gray-400 md:font-medium max-sm:text-xs  hover:bg-gray-100 rounded-lg px-4 py-2 w-1/2"
          >
            View Details
          </Link>
          <button className="bg-purple-600 hover:bg-purple-700  max-sm:text-xs md:font-medium text-white rounded-lg px-4 py-2 w-1/2">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
