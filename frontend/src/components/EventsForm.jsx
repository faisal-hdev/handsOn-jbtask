/* eslint-disable no-unused-vars */
import React from "react";
import requestAPI from "../utils/requestAPI";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EventsForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form data----->", data);
    // Data send to the server
    try {
      const response = await requestAPI.post("/event", data);
      if (response.status === 200 || response.status === 201) {
        toast.success("Event created successfully!");
        reset(); // reset form fields
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create event.");
    }
    navigate("/discover-events");
  };
  return (
    <section className="my-10 md:my-20">
      <div className="flex flex-col mx-auto lg:flex-row mb-8">
        <div className="flex flex-col w-full lg:w-2/3 text-black">
          <h1 className="text-2xl md:text-5xl font-bold leading-none">
            Create Volunteer Events
          </h1>
          <p className="my-2 text-lg md:text-xl w-full md:w-[80%]">
            Provide details, set goals, and invite others to join, creating
            opportunities for meaningful social impact together.
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-auto space-y-12 bg-gray-50"
      >
        <fieldset className="grid grid-cols-3 gap-6 p-3 md:p-6 rounded-md shadow-sm">
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm md:text-lg text-black font-normal">
                Category
              </label>
              <select
                {...register("category", { required: true })}
                name="category"
                id="category"
                className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
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
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm mb-3 md:text-lg text-black font-normal">
                Title
              </label>
              <input
                {...register("title", { required: true })}
                id="title"
                type="text"
                name="title"
                className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm md:text-lg text-black font-normal">
                Date
              </label>
              <input
                {...register("date", { required: true })}
                id="date"
                name="date"
                type="date"
                className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm md:text-lg text-black font-normal">
                Start Time
              </label>
              <input
                {...register("startTime", { required: true })}
                type="time"
                id="startTime"
                name="startTime"
                className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm md:text-lg text-black font-normal">
                End Time
              </label>
              <input
                {...register("endTime", { required: true })}
                type="time"
                id="endTime"
                name="endTime"
                className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm mb-3 md:text-lg text-black font-normal">
                Maximum Participants
              </label>
              <input
                {...register("maxParticipants", { required: true })}
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm md:text-lg text-black font-normal">
                Location
              </label>
              <select
                {...register("location", { required: true })}
                id="location"
                name="location"
                className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
              >
                <option value="">Select a location</option>
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
            <div className="col-span-full sm:colspan-3">
              <label className="text-sm md:text-lg text-black font-normal">
                Event Description
              </label>
              <textarea
                {...register("description", { required: true })}
                id="description"
                type="text"
                name="description"
                className="block text-black md:h-36 w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
              ></textarea>
            </div>
            <div className="col-span-full sm:colspan-3">
              <label className="text-sm md:text-lg text-black font-normal">
                Special Requirements
              </label>
              <textarea
                {...register("requirements", { required: true })}
                id="requirements"
                type="text"
                name="requirements"
                className="block text-black md:h-20 w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
              ></textarea>
            </div>
            <div className="col-span-full sm:colspan-3">
              <button
                type="submit"
                className="px-8 mt-4 md:text-lg font-medium md:mt-6 mb-4 md:mb-5 py-2.5 md:py-4 w-full leading-5 text-white transition-colors duration-300 bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none"
              >
                Create Event
              </button>
            </div>
          </div>
        </fieldset>
      </form>
      <Toaster position="top-center" />
    </section>
  );
};

export default EventsForm;
