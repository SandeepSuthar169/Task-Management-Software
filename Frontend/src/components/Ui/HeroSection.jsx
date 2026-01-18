import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

function HeroSection() {
  return (
    <section className="w-full bg-neutral-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              The all-in-one platform for    
              <span className="text-orange-400">  project management</span>
            </h1>

            <div className="space-y-3">
              <p className="flex items-center gap-2 text-gray-300">
                <IoCheckmarkCircleOutline className="text-pink-600 text-xl" />
                Plan your projects
              </p>

              <p className="flex items-center gap-2 text-gray-300">
                <IoCheckmarkCircleOutline className="text-pink-600  text-xl" />
                Track work efficiently
              </p>

              <p className="flex items-center gap-2 text-gray-300">
                <IoCheckmarkCircleOutline className="text-pink-600 text-xl" />
                Collaborate with global teams
              </p>
            </div>

            <button className="bg-pink-500 hover:bg-pink-600 transition px-6 py-3 rounded-md font-semibold w-fit shadow-lg">
              Get Started
            </button>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src="images\Dash.avif"
              alt="kan-ban-board"
              className="w-full max-w-lg md:max-w-lg rounded-lg shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
