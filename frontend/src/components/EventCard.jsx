import requestAPI from "../utils/requestAPI";
import { MdOutlineDateRange } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { IoPeopleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
    maxParticipants,
    participants = [],
  } = eventItem || {};
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isJoined = currentUser && participants.includes(currentUser.id);

  const handleJoin = async () => {
    if (!currentUser) {
      return navigate("/signIn");
    }
    try {
      await requestAPI.post(`/event/${_id}/join`);
      toast.success("Joined the event");
      window.location.reload(); // or trigger a state update
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to join");
    }
  };

  const handleLeave = async () => {
    try {
      await requestAPI.post(`/event/${_id}/leave`);
      toast.success("Left the event");
      window.location.reload(); // or trigger a state update
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to leave");
    }
  };
  return (
    <div className="w-full flex flex-col justify-between border rounded-lg bg-white border-purple-400">
      <div className="pb-10">
        <h3 className="text-center text-sm border-0 rounded-br-lg rounded-tl-lg bg-gray-200 p-2 w-1/2 text-purple-600 font-medium">
          {category || "NA"}
        </h3>
      </div>
      <div className="px-3 md:px-6 mb-3 md:pb-4 space-y-4 md:space-y-8">
        <h3 title={title} className="text-xl font-medium">
          {title.substring(0, 70)}...
        </h3>
        <p title={description} className="text-base">
          {description.substring(0, 70)}...
        </p>
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-sm font-medium">
            <MdOutlineDateRange className="text-purple-600" size={18} />
            Date: {new Date(date).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2 text-sm font-medium">
            <LuTimerReset className="text-purple-600" size={18} />
            Time: {startTime} to {endTime}
          </p>
          <p className="flex items-center gap-2 text-sm font-medium">
            <GrLocation className="text-purple-600" size={18} />
            Location: {location}
          </p>
        </div>
        <p className="flex items-center gap-2 text-sm font-medium">
          <IoPeopleOutline className="text-purple-600" size={18} />
          Participants: {maxParticipants}
        </p>
        <div className="flex gap-2 md:gap-4 flex-col md:flex-row-reverse justify-between">
          <Link
            to={`/event/${_id}`}
            className="border text-center font-medium  text-x s w-full border-gray-400 hover:bg-gray-100 rounded-lg px-4 py-2 md:w-1/2"
          >
            View Details
          </Link>
          {isJoined ? (
            <button
              onClick={handleLeave}
              className="bg-red-600 hover:bg-red-500 text-center font-medium  text-x s w-full  text-white rounded-lg px-4 py-2 md:w-1/2"
            >
              Leave Event
            </button>
          ) : (
            <button
              onClick={handleJoin}
              className="bg-purple-600 hover:bg-purple-500 text-center font-medium  text-x s w-full  text-white rounded-lg px-4 py-2 md:w-1/2"
            >
              Join Now
            </button>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default EventCard;
