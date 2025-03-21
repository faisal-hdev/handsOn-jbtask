import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  console.log(events);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/events`);
      setEvents(data);
    };
    getData();
  }, []);

  return (
    <div className="md:my-20 my-8 lg:my-32">
      <div className="text-black flex max-md:flex-col max-md:text-center justify-between items-center">
        <div className="flex flex-col w-full lg:w-2/3 text-black">
          <h1 className="text-2xl md:text-5xl font-bold leading-none">
            Here are all Events
          </h1>
        </div>
        <div className="flex items-center justify-center gap-x-6">
          <Link
            to="/create-events"
            className="transition flex items-center text-white px-4 md:px-8 justify-center gap-2 text-base md:text-lg py-3 rounded-lg font-semibold ease-in-out delay-150 bg-purple-500 max-md:mt-4  hover:bg-purple-600 duration-300"
          >
            Create Events
            <MdKeyboardDoubleArrowRight size={20} />
          </Link>
        </div>
      </div>
      <div className="my-10 md:my-20">
        {/* Sorting events */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 my-5 md:m-10">
          <div>
            <select
              name="category"
              id="category"
              className=" text-black w-full px-4 py-2 md:py-3 bg-white border rounded-lg focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
            >
              <option value="">Choose a category</option>
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
          <form>
            <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-purple-400 focus-within:ring-purple-300">
              <input
                type="text"
                name="search"
                className=" text-black focus:outline-none w-full px-4 py-2 md:py-3 bg-white border rounded-lg"
                placeholder="Enter Location Name"
                aria-label="Enter location Name"
              />
              <button className="px-1 md:px-4 py-2 text-sm font-medium tracking-wider text-black uppercase transition-colors duration-300 transform   rounded-md">
                Search
              </button>
            </div>
          </form>
          <div>
            <input
              type="date"
              name="sort"
              id="sort"
              className=" text-black w-full px-8 py-2 md:py-3 bg-white border rounded-lg focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
            ></input>
          </div>
          <button className="rounded-lg md:uppercase px-4 md:px-6 border border-purple-400 bg-slate-100 hover:bg-slate-200  text-black py-2 md:font-medium">
            Reset
          </button>
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
