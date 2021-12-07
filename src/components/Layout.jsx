import DeskTopBar from "./SideBar";
import { useState, useContext, useEffect } from "react";
import HeadNav from "./HeadNav";
import MenuBar from "./MenuBar";
import { Store } from "../context/store";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { userIsLoggedIn } = useContext(Store);
  console.log(userIsLoggedIn)
  useEffect(() => {
    if (!userIsLoggedIn) {
      navigate("/");
    }
  }, [userIsLoggedIn, navigate]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="relative h-screen flex overflow-hidden bg-gray-200 font-body">
      <MenuBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <DeskTopBar />
      <div className="flex-1  overflow-auto focus:outline-none">
        <HeadNav setSidebarOpen={setSidebarOpen} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
