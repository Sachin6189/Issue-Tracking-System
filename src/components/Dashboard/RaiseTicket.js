import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const RaiseTicket = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      {showSidebar && <Sidebar />}
    </div>
  );
};

export default RaiseTicket;
