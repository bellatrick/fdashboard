import React from 'react'
import ProfileDropDown from "../components/ProfileDropDown";
import {
    BellIcon,
    MenuAlt1Icon,
   
  } from "@heroicons/react/outline";
  import {
    SearchIcon,
  } from "@heroicons/react/solid";

const HeadNav = ({setSidebarOpen}) => {

    return (

           <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          {/* Search bar */}
          <div className="flex-1 px-2 flex sm:px-6 lg:mx-5">
            <div className="flex-1 flex items-center lg:-ml-8 ">
              <div className="w-full  px-2 lg:px-6">
                <label htmlFor="search" className="sr-only">
                  Search projects
                </label>
                <div className="relative text-gray-300 focus-within:text-gray-40 w-full lg:w-96 rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-100 bg-opacity-25 text-indigo-100 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 border-gray-300 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className=" flex items-center ">
              <button
                type="button"
                className="bg-white p-1 ml-32 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <ProfileDropDown/>
            </div>
          </div>
        </div> 
     
    )
}

export default HeadNav
