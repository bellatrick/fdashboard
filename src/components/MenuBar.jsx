
import { Fragment,useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { 
 
    XIcon,
  } from "@heroicons/react/outline";
  import {
    Dashboard,
    Add,
    MessageRounded,
    Description,
    GroupWork
  } from "@material-ui/icons";
  import {Store} from '../context/store'
  import { NavLink as BaseNavLink } from "react-router-dom";
  const navigation1 = [
    { name: "Products", href: "/products", icon: Dashboard, exact:true },
    { name: "Add New Product", href: "/addproduct", icon: Add,exact:true },   
    { name: "Messages", href: "/messages", icon: MessageRounded,exact:false }, 
    { name: "Categories", href: "/category", icon: GroupWork,exact:false },
  ];

  const secondaryNavigation = [
    { name: "Logout", href: "/support", icon: Description,exact:false },
   
  ];
 
const MenuBar = ({sidebarOpen, setSidebarOpen}) => {
  const {logoutHandler}= useContext(Store)
    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-green-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 text-white right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className="h-7 w-auto"
                  src=''
                  alt="logo"
                />
              </div>
              <nav
                className="mt-5 flex-shrink-0 h-full overflow-y-auto"
                aria-label="Sidebar"
              >
                <p className="px-6 text-white py-4 text-xs font-semibold">MAIN</p>
                <div className="px-2 space-y-1">
                {navigation1.map((item) => (
                <BaseNavLink
                  key={item.name}
                  to={item.href}
                  
                 
                  className={({isActive})=>["text-white hover:text-white hover:bg-green-600 group flex items-center pl-8 px-2 py-4 text-lg  leading-6 font-medium rounded-md", isActive?" text-green-200 bg-green-600":'bg-white'].filter(Boolean).join()}
                >
                  <item.icon
                    className="mr-4 flex-shrink-0 h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                  {item.name}
                </BaseNavLink>
              ))}
                </div>
           
              
                <div className="mt-16 pt-6">
                  <div className="px-2 cursor-pointer space-y-1">
                  {secondaryNavigation.map((item) => (
                  <div
                    key={item.name}
                  
                    onClick={logoutHandler}
                    className="group flex items-center font-bold py-4 text-lg leading-6 pl-6 hover:bg-green-600 tracking-wider rounded-md text-white "
                  >
                    <item.icon
                      className="mr-4 h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                ))}
                  </div>
                </div>
              </nav>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">

          </div>
        </Dialog>
      </Transition.Root>
    )
}

export default MenuBar
