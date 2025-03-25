import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import { IoReloadCircleSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const Events = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    date: "",
    creatorOnly: false,
  });
  const getData = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.location) queryParams.append("location", filters.location);
      if (filters.date) queryParams.append("date", filters.date);
      if (filters.creatorOnly && currentUser?._id) {
        queryParams.append("createdBy", currentUser._id);
      }
      // requestAPI.post("/event", data)
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASEURL}/events?${queryParams.toString()}`
      );
      setEvents(data);
    } catch (err) {
      toast.error("Failed to fetch events:", err);
      console.error("Failed to fetch events:", err);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  const handleReset = () => {
    setFilters({ category: "", location: "", date: "", creatorOnly: false });
  };

  return (
    <div className="md:my-20 my-8 lg:my-32">
      <div className="text-black flex max-md:flex-col max-md:text-center justify-between items-center">
        <div className="flex flex-col w-full lg:w-2/3 text-black">
          <h1 className="text-2xl md:text-5xl font-bold leading-none">
            All Events
          </h1>
        </div>
        <div className="flex items-center justify-center gap-x-6">
          <Link
            to="/create-events"
            className="transition flex items-center text-white px-4 justify-center gap-2 text-base py-3 rounded-lg font-semibold ease-in-out delay-150 bg-purple-500 max-md:mt-4 hover:bg-purple-600 duration-300"
          >
            Create Events
            <MdKeyboardDoubleArrowRight size={20} />
          </Link>
        </div>
      </div>
      <div className="my-10 md:my-20">
        {/* Display filter */}
        <div className="flex border border-purple-200 rounded-lg p-5 w-full md:w-[80%] mx-auto flex-col md:flex-row items-center justify-center gap-2 md:gap-5">
          <div className="w-full md:w-1/2">
            <select
              name="category"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              id="category"
              className="w-full text-black px-4 py-2 md:py-3 bg-white border rounded-lg focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
            >
              <option value="">All Categories</option>
              <option value="Environmental">Environmental</option>
              <option value="Disaster Relief">Disaster Relief</option>
              <option value="Arts & Culture">Arts & Culture</option>
              <option value="Animal Welfare">Animal Welfare</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Sports & Recreation">Sports & Recreation</option>
              <option value="Education & Mentorship">
                Education & Mentorship
              </option>
              <option value="Advocacy & Human Rights">
                Advocacy & Human Rights
              </option>
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <select
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
              name="category"
              id="category"
              className=" text-black w-full px-4 py-2 md:py-3 bg-white border rounded-lg focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
            >
              <option value="">Select location</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Khulna">Khulna</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Barisal">Barisal</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Cox's Bazar">Cox's Bazar</option>
              <option value="Comilla">Comilla</option>
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className=" text-black w-full px-4 py-2 md:py-3 bg-white border rounded-lg focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>
          <div className="w-full md:w-[10%] text-4xl mx-auto flex justify-end md:justify-center">
            <button title="Reset Filter" onClick={handleReset} className=" ">
              <IoReloadCircleSharp />
            </button>
          </div>
        </div>
        {/* Display events */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 md:my-12">
          {events.map((eventItem) => (
            <EventCard key={eventItem._id} eventItem={eventItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
