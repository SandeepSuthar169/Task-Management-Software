import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Navigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import  { LineItems }  from "../constants/Props.jsx"
import { ChecksBoxItems } from "../constants/Props.jsx"


function HeroSection() {
  return (
    <div className="w-full">
    <div className="w-full bg-amber-100  text-white py-16">
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

            <div  className="bg-pink-500 hover:bg-pink-600 transition px-6 py-3 rounded-md font-semibold w-fit shadow-lg">
            <NavLink to="/todos">
              Get Start
            </NavLink>
            </div>
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
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 mt-10">
        <ul className="max-w-3xl">
          <li className="text-center sm:text-left text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">Join the 
            <span className="font-semibold">300,000+</span> customers that power team collaboration with <span className="font-semibold text-blue-600">
              Atlassian
            </span>
          </li>
         </ul>
      </div>
      <div className="w-full py-8 px-4 sm:px-6 lg:px-12">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
      
      <img
        src="https://dam-cdn.atl.orangelogic.com/AssetLink/q12105gpgq24dax7m0y2dww8m2lww0mp/fl_keep_metadata/logo-strava.svg"
        alt="Strava"
        className="h-8 sm:h-10 md:h-12 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition"
      />

      <img
        src="https://dam-cdn.atl.orangelogic.com/AssetLink/658vw3s1k5w08l30a12423yubi22ttg2/fl_keep_metadata/CSD-9732_Customer-Logo-Square.webp"
        alt="Customer"
        className="h-8 sm:h-10 md:h-12 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition"
      />

      <img
        src="https://dam-cdn.atl.orangelogic.com/AssetLink/yfboqb04f58iu8j06qn75uys682ak30g/fl_keep_metadata/logo-AMD.svg"
        alt="AMD"
        className="h-8 sm:h-10 md:h-12 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition"
      />

      <img
        src="https://dam-cdn.atl.orangelogic.com/AssetLink/g26n5u77y20b0aes11621wt5x0fk2wj5/fl_keep_metadata/logo-venmo.svg"
        alt="Venmo"
        className="h-8 sm:h-10 md:h-12 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition"
      />

      <img
        src="https://cdn.prod.website-files.com/63bd15a406b2101a5dbb3e8f/65f0151a95f7f97e1b1ee891_Coca-Cola.svg"
        alt="Coca-Cola"
        className="h-8 sm:h-10 md:h-12 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition"
      />

      <img
        src="https://cdn.prod.website-files.com/63bd15a406b2101a5dbb3e8f/65f0151b631873adc71179f3_BD.avif"
        alt="BD"
        className="h-8 sm:h-10 md:h-12 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition"
      />

    </div>
  </div>
</div>


      </div>
      <div className="w-full bg-gray-50 py-12 md:py-20">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        <div className="space-y-5 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Project management made easy
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Manage simple to complex projects and everything <br className="hidden sm:block" />
            in between with FlowBoard <br />
            <span className="font-medium text-gray-800">
              Select what you want to manage:
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ChecksBoxItems.map((CheckBox, index) => {
            const Icon = CheckBox.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:shadow-md transition duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                  <Icon className={`text-xl ${CheckBox.color}`} />
                </div>
                <p className="text-gray-700 font-medium">
                  {CheckBox.text}
                </p>
              </div>
            );
          })}        
        </div>

      </div>
    </div>
  </div>
  <div className="w-full py-10">
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {LineItems.map((line, index) => {
                        const Icon = line.icon
                        return (
                            <div key={index}
                            className="flex items-center gap-4 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                            <Icon className={`text-4xl ${line.color}`}/> 
                            <p className="text-lg font-medium text-gray-700">{line.text}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        <div className="bg-amber-100 py-8 md:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    <div className="flex justify-center items-center order-2 lg:order-2">
                        <img
                            src="images\Screenshot 2026-01-20 234526.png"
                            alt="ToDos"
                            className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl object-contain rounded-lg shadow-lg"
                        />
                    </div>
                    
                    <div className="flex flex-col justify-center space-y-4 sm:space-y-6 order-1 lg:order-1">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            To Do gives you focus, from Project to play with team
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                            Your projects may be complex, but your project management tools don't have to be. Combine a rich set of features with flexibility, simplicity, and ease of use to deliver complex projects quickly, while creating meaningful experiences for your customers.
                        </p>
                    </div>

                    
                </div>
            </div>
        </div>
        <div className="bg-amber-100 py-8 md:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    <div className="flex justify-center items-center order-2 lg:order-1">
                    <img
                        src="images\6bad5eb3-1ac9-4b58-b243-8ba4bb857af5-cover-2494198440.png"
                        alt="ToDos"
                        className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl object-contain rounded-lg shadow-lg"
                    />
                    </div>

                    <div className="flex flex-col justify-center space-y-4 sm:space-y-6 order-1 lg:order-2">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            To Do gives you focus, from Project to play with team
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                            Your projects may be complex, but your project management tools don't have to be. Combine a rich set of features with flexibility, simplicity, and ease of use to deliver complex projects quickly, while creating meaningful experiences for your customers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-amber-100 py-8 md:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    <div className="flex justify-center items-center order-2 lg:order-2">
                        <img
                            src="images\31d9f5146032943.62a90b5607ef2.jpg"
                            alt="ToDos"
                            className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl object-contain rounded-lg shadow-lg"
                        />
                    </div>
                    
                    <div className="flex flex-col justify-center space-y-4 sm:space-y-6 order-1 lg:order-1">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            To Do gives you focus, from Project to play with team
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                            Your projects may be complex, but your project management tools don't have to be. Combine a rich set of features with flexibility, simplicity, and ease of use to deliver complex projects quickly, while creating meaningful experiences for your customers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}

export default HeroSection;
