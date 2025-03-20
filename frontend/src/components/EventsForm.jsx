/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";

const EventsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form data----->", data);

    //Data send to the server
    fetch(`http://localhost:5000/event`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("Event added successful");
        }
      });
    reset();
  };

  return (
    <section>
      <div className="flex flex-col mx-auto lg:flex-row mt-10 md:mt-16 mb-8">
        <div className="flex flex-col w-full lg:w-2/3 text-black">
          <h1 className="text-2xl md:text-5xl font-bold leading-none">
            Submit Volunteer Events
          </h1>
          <p className="my-2 text-lg md:text-xl w-full md:w-[80%]">
            Provide details, set goals, and invite others to join, creating
            opportunities for meaningful social impact together.
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-auto space-y-12 bg-gray-100"
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
              <label className="text-sm md:text-lg text-black font-normal">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                id="email"
                name="email"
                type="email"
                className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
              />
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
                Location
              </label>
              <input
                {...register("location", { required: true })}
                type="text"
                id="location"
                name="location"
                className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm md:text-lg text-black font-normal">
                description
              </label>
              <textarea
                {...register("description", { required: true })}
                id="description"
                type="text"
                name="description"
                className="block text-black  w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
              ></textarea>
              <button
                type="submit"
                className="px-8 mt-4 md:mt-6 py-2.5 md:py-4 w-full leading-5 text-white transition-colors duration-300 bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none"
              >
                Create Event
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default EventsForm;
