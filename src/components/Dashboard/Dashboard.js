import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Navbar/Sidebar";

const Dashboard = () => {
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

export default Dashboard;
