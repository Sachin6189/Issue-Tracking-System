import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import userLogo from "../assets/user.png";
import Sidebar from "../assets/sidebar.png";
import Logo from "../assets/logo.png";

const Navbar = ({ toggleSidebar}) => {
  
  const [showSignout, setShowSignout] = useState(false);
  const navigate = useNavigate();

  const username = sessionStorage.getItem("username");
  

  const handleSignout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("emp_id");
    
    navigate("/");
    setShowSignout(false);
  };

  return (
    <div>
      <nav className="bg-gray-800 p-1 flex justify-between items-center sticky z-10 pr-4">
        <div className="flex items-center gap-4 ">
          <Link to="/dashboard">
            <img src={Logo} alt="Logo" className="h-10 rounded-xl ml-2 " />
          </Link>
        </div>
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <img
              src={userLogo}
              alt="userLogo"
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={() => setShowSignout(!showSignout)}
            />
            {showSignout && (
              <button
                className="absolute top-12 left-0 bg-gray-800 text-[#47c8c3] font-semibold font-[fangsong] px-6 py-2 rounded shadow-md border-0 whitespace-nowrap"
                onClick={handleSignout}
              >
                Log Out
              </button>
            )}
          </div>
          <span className="text-[#47c8c3] font-semibold font-[fangsong]">
            {username}
          </span>
          <img
            src={Sidebar}
            alt="sidebar"
            className="h-8 w-8 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
