import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Footer from "./Footer";
import DashboardTable from "./DashboardTable";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      {showSidebar && <Sidebar />}
      <Main />
      <DashboardTable />
      <Footer />
    </div>
  );
};

export default Dashboard;
