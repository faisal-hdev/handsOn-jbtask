import React from "react";
import { GrLocation } from "react-icons/gr";
import { LuTimerReset } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import requestAPI from "../utils/requestAPI";

const EventDetails = () => {
  const eventItem = useLoaderData();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log(currentUser);

  const {
    _id,
    category,
    title,
    description,
    startTime,
    endTime,
    date,
    location,
    maxParticipants,
    requirements,
    createdBy,
    participants = [],
  } = eventItem || {};
  const isCreator = currentUser?.id === createdBy?._id;
  const alreadyJoined = participants.includes(currentUser?.id);
  const spotsLeft = maxParticipants - participants.length;

  const handleDelete = async (id) => {
    try {
      await requestAPI.delete(`/event/${id}`);
      toast.success("Deleted successfully");
      navigate("/discover-events");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete event.");
    }
  };

  const handleJoin = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to join.");
      return;
    }
    if (alreadyJoined) {
      toast.error("You have already joined this event.");
      return;
    }
    if (spotsLeft <= 0) {
      toast.error("No spots available for this event.");
      return;
    }
    try {
      await requestAPI.post(`/event/${_id}/join`);
      toast.success("Successfully joined the event!");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to join event.");
    }
    window.location.reload(); // Reload to update participants list
  };
  return (
    <div className="my-10 md:my-28">
      <div className="flex justify-between mx-auto items-center w-full mb-10 md:mb-16">
        <div>
          <Link
            to="/discover-events"
            className="flex items-center hover:text-black text-purple-600 font-medium text-sm md:text-xl gap-1 mb-5 md:mb-10"
          >
            <GoArrowLeft size={20} />
            Back to Events
          </Link>
        </div>
        {isCreator && (
          <div className="flex gap-2 md:gap-6 text-white md:font-medium">
            <Link
              to={`/update/${_id}`}
              className="bg-purple-600 text-sm px-4 gap-2 hover:bg-purple-700 rounded-lg py-2 flex items-center"
            >
              <FaRegEdit size={20} />
              Edit Event
            </Link>
            <button
              title="Delete this event"
              onClick={() => handleDelete(_id)}
              className="bg-red-500 text-sm gap-2 hover:bg-red-600 px-2 rounded-lg py-2 flex items-center"
            >
              <RiDeleteBin4Line size={20} />
            </button>
          </div>
        )}
      </div>
      <div className="flex relative flex-col md:flex-row justify-between gap-10 md:gap-20 items-center md:max-w-screen-xl mx-auto">
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
        <div className="md:w-[40%] w-full space-y-0 md:space-y-10 gap-3 p-0 md:p-6 flex flex-col justify-between md:min-h-[350px] md:bg-gray-50">
          <div className=" flex justify-end">
            {isCreator && (
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg">
                You created this event
              </span>
            )}
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Participants</span>
              <span className="text-purple-700 font-semibold">
                {participants.length}/{maxParticipants}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{
                  width: `${(participants.length / maxParticipants) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-green-600 mt-2 text-sm">
              {spotsLeft} spots remaining
            </p>
            {participants.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium mb-1">Recent Volunteers:</p>
                <div className="flex space-x-2">
                  {participants.slice(0, 5).map((p, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-sm font-semibold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2">What to Expect</h4>
            <div className="md:space-y-1.5">
              <p>Coordination and orientation upon arrival</p>
              <p>Opportunity to meet like-minded volunteers</p>
              <p>Certificate of participation for your volunteer hours</p>
            </div>
          </div>
          {!isCreator && (
            <div className="mt-6">
              <button
                onClick={handleJoin}
                disabled={alreadyJoined || spotsLeft <= 0}
                className={`${
                  alreadyJoined || spotsLeft <= 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                } text-white px-6 py-3 rounded-lg w-full`}
              >
                {alreadyJoined
                  ? "Already Joined"
                  : spotsLeft <= 0
                  ? "Event Full"
                  : "Join Now"}
              </button>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default EventDetails;
