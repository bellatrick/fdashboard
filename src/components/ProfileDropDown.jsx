import React from "react";
import { Fragment, useContext,useEffect,useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {Store} from '../context/store'
import jwt_decode from "jwt-decode";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProfileDropDown = () => {
  const {logoutHandler,state}= useContext(Store)
  const [username,setUsername]=useState('')
  useEffect(() => {
    if(state.userInfo){
      const data= jwt_decode(state.userInfo)
      console.log(data)
     setUsername(data.username)
    }

  }, [state.userInfo])
  console.log(username)
  return (

    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primarylight lg:p-2 lg:rounded-md lg:hover:bg-gray-100">
        
          <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
            <span className="sr-only">Open user menu for </span>Welcome {username}
          </span>
          <ChevronDownIcon
            className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
         
        
          <Menu.Item>
            {({ active }) => (
              <p
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700 hover:text-primary"
                )}
                onClick={logoutHandler}
              >
                Logout
              </p>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropDown;
