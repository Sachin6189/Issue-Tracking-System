import React, { useState } from "react";
import userLogo from "../../assets/profile.png";
import Sidebar from "../../assets/sidebar.png";
import Logo from "../../assets/logo.png";

const Navbar = ({ toggleSidebar }) => {
  const [showSignout, setShowSignout] = useState(false);
  const username = "Sachin Kumar";

  const handleSignout = () => {
    console.log("Signout clicked");
    setShowSignout(false);
  };

  return (
    <nav className="bg-gray-800 p-1 flex justify-between items-center sticky pr-4">
      <div className="flex items-center gap-4 ">
        <img src={Logo} alt="Logo" className="h-10 rounded-xl ml-2" />
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
  );
};

export default Navbar;
