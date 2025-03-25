/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import axios from "axios";
// import React from "react";
// import { useForm } from "react-hook-form";
// import toast, { Toaster } from "react-hot-toast";
// import { useLoaderData, useNavigate } from "react-router-dom";
// import requestAPI from "../utils/requestAPI";

// const UpdateEvent = () => {
//   const navigate = useNavigate();
//   const event = useLoaderData();
//   const {
//     _id,
//     category,
//     title,
//     description,
//     startTime,
//     endTime,
//     date,
//     location,
//     createdBy,
//     maxParticipants,
//     requirements,
//   } = event || {};
//   console.log(event);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     console.log("Form data----->", data);
//     try {
//       const { eventData } = await requestAPI.put(
//         `${import.meta.env.VITE_API_BASEURL}/event/${_id}`,
//         data
//       );
//       console.log(eventData);
//       toast.success("Updated successfully ", {
//         style: {
//           border: "1px solid #713200",
//           padding: "16px",
//           color: "#713200",
//         },
//         iconTheme: {
//           primary: "#713200",
//           secondary: "#FFFAEE",
//         },
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//     navigate("/discover-events");
//   };
//   return (
//     <section className="my-10 md:my-20">
//       <div className="flex flex-col mx-auto lg:flex-row mb-8">
//         <div className="flex flex-col w-full lg:w-2/3 text-black">
//           <h1 className="text-2xl md:text-5xl font-bold leading-none">
//             Update Events
//           </h1>
//         </div>
//       </div>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col mx-auto space-y-12 bg-gray-50"
//       >
//         <fieldset className="grid grid-cols-3 gap-6 p-3 md:p-6 rounded-md shadow-sm">
//           <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
//             <div className="col-span-full sm:col-span-3">
//               <label className="text-sm md:text-lg text-black font-normal">
//                 Category
//               </label>
//               <select
//                 {...register("category")}
//                 defaultValue={category}
//                 name="category"
//                 id="category"
//                 className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
//               >
//                 <option value="">Choose a category</option>
//                 <option value="Environmental">Environmental </option>
//                 <option value="Disaster Relief">Disaster Relief</option>
//                 <option value="Arts & Culture">Arts & Culture</option>
//                 <option value="Animal Welfare">Animal Welfare</option>
//                 <option value="Health & Wellness">Health & Wellness</option>
//                 <option value="Sports & Recreation">Sports & Recreation</option>
//                 <option value=" Education & Mentorship">
//                   Education & Mentorship
//                 </option>
//                 <option value="Advocacy & Human Rights">
//                   Advocacy & Human Rights
//                 </option>
//                 <option value="">Others</option>
//               </select>
//             </div>
//             <div className="col-span-full sm:col-span-3">
//               <label className="text-sm mb-3 md:text-lg text-black font-normal">
//                 Title
//               </label>
//               <input
//                 {...register("title")}
//                 defaultValue={title}
//                 id="title"
//                 type="text"
//                 name="title"
//                 className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
//               />
//             </div>
//             <div className="col-span-full sm:col-span-3">
//               <label className="text-sm md:text-lg text-black font-normal">
//                 Date
//               </label>
//               <input
//                 {...register("date")}
//                 defaultValue={date}
//                 id="date"
//                 name="date"
//                 type="date"
//                 className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
//               />
//             </div>
//             <div className="col-span-full sm:col-span-3">
//               <label className="text-sm md:text-lg text-black font-normal">
//                 Start Time
//               </label>
//               <input
//                 {...register("startTime")}
//                 defaultValue={startTime}
//                 type="time"
//                 id="startTime"
//                 name="startTime"
//                 className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
//               />
//             </div>
//             <div className="col-span-full sm:col-span-3">
//               <label className="text-sm md:text-lg text-black font-normal">
//                 End Time
//               </label>
//               <input
//                 {...register("endTime")}
//                 defaultValue={endTime}
//                 type="time"
//                 id="endTime"
//                 name="endTime"
//                 className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
//               />
//             </div>
//             <div className="col-span-full sm:col-span-3">
//               <label className="text-sm mb-3 md:text-lg text-black font-normal">
//                 Maximum Participants
//               </label>
//               <input
//                 {...register("maxParticipants")}
//                 defaultValue={maxParticipants}
//                 type="number"
//                 id="maxParticipants"
//                 name="maxParticipants"
//                 className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
//               />
//             </div>
//             <div className="col-span-full sm:col-span-3">
//               <label className="text-sm mb-3 md:text-lg text-black font-normal">
//                 Location
//               </label>
//               <input
//                 {...register("location")}
//                 defaultValue={location}
//                 type="text"
//                 id="location"
//                 name="location"
//                 className="block text-black w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg    focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
//               />
//             </div>
//             <div className="col-span-full sm:colspan-3">
//               <label className="text-sm md:text-lg text-black font-normal">
//                 Event Description
//               </label>
//               <textarea
//                 {...register("description")}
//                 defaultValue={description}
//                 id="description"
//                 type="text"
//                 name="description"
//                 className="block text-black md:h-36 w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
//               ></textarea>
//             </div>
//             <div className="col-span-full sm:colspan-3">
//               <label className="text-sm md:text-lg text-black font-normal">
//                 Special Requirements
//               </label>
//               <textarea
//                 {...register("requirements")}
//                 defaultValue={requirements}
//                 id="requirements"
//                 type="text"
//                 name="requirements"
//                 className="block text-black md:h-20 w-full px-4 py-2 md:py-3 text-black-700 bg-white border rounded-lg focus:border-purple-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-purple-300"
//               ></textarea>
//             </div>
//             <div className="col-span-full sm:colspan-3">
//               <button
//                 type="submit"
//                 className="px-8 mt-4 md:text-lg font-medium md:mt-6 mb-4 md:mb-5 py-2.5 md:py-4 w-full leading-5 text-white transition-colors duration-300 bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none"
//               >
//                 Update Event
//               </button>
//             </div>
//           </div>
//         </fieldset>
//       </form>
//       <Toaster position="top-center" />
//     </section>
//   );
// };

// export default UpdateEvent;

import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import requestAPI from "../utils/requestAPI";

const UpdateEvent = () => {
  const navigate = useNavigate();
  const event = useLoaderData();
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
  } = event || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        maxParticipants: parseInt(data.maxParticipants),
      };

      const response = await requestAPI.put(`/event/${_id}`, payload);

      if (response.status === 200 || response.status === 201) {
        toast.success("Event updated successfully!");
        navigate("/discover-events");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to update event.");
    }
  };

  return (
    <section className="my-10 md:my-20">
      <div className="mb-8">
        <h1 className="text-2xl md:text-5xl font-bold text-black">
          Update Event
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-auto space-y-12 bg-gray-50"
      >
        <fieldset className="grid grid-cols-3 gap-6 p-6 rounded-md shadow-sm">
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            {/* Category */}
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm md:text-lg text-black font-normal">
                Category
              </label>
              <select
                {...register("category")}
                defaultValue={category}
                className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-purple-400 focus:outline-none"
              >
                <option value="">Choose a category</option>
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

            {/* Title */}
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm md:text-lg text-black font-normal">
                Title
              </label>
              <input
                {...register("title")}
                defaultValue={title}
                type="text"
                className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-purple-400 focus:outline-none"
              />
            </div>

            {/* Date */}
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm md:text-lg text-black font-normal">
                Date
              </label>
              <input
                {...register("date")}
                defaultValue={date?.slice(0, 10)}
                type="date"
                className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-purple-400 focus:outline-none"
              />
            </div>

            {/* Start Time */}
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm md:text-lg text-black font-normal">
                Start Time
              </label>
              <input
                {...register("startTime")}
                defaultValue={startTime}
                type="time"
                className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-purple-400 focus:outline-none"
              />
            </div>

            {/* End Time */}
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm md:text-lg text-black font-normal">
                End Time
              </label>
              <input
                {...register("endTime")}
                defaultValue={endTime}
                type="time"
                className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-purple-400 focus:outline-none"
              />
            </div>

            {/* Participants */}
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm md:text-lg text-black font-normal">
                Maximum Participants
              </label>
              <input
                {...register("maxParticipants")}
                defaultValue={maxParticipants}
                type="number"
                className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-purple-400 focus:outline-none"
              />
            </div>

            {/* Location */}
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm md:text-lg text-black font-normal">
                Location
              </label>
              <select
                {...register("location")}
                defaultValue={location}
                className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-purple-400 focus:outline-none"
              >
                <option value="">Choose location</option>
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

            {/* Description */}
            <div className="col-span-full">
              <label className="text-sm md:text-lg text-black font-normal">
                Event Description
              </label>
              <textarea
                {...register("description")}
                defaultValue={description}
                className="block w-full px-4 py-2 h-28 text-black bg-white border rounded-lg focus:border-purple-400 focus:outline-none"
              ></textarea>
            </div>

            {/* Requirements */}
            <div className="col-span-full">
              <label className="text-sm md:text-lg text-black font-normal">
                Special Requirements
              </label>
              <textarea
                {...register("requirements")}
                defaultValue={requirements}
                className="block w-full px-4 py-2 h-20 text-black bg-white border rounded-lg focus:border-purple-400 focus:outline-none"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="col-span-full">
              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Update Event
              </button>
            </div>
          </div>
        </fieldset>
      </form>

      <Toaster position="top-center" />
    </section>
  );
};

export default UpdateEvent;
