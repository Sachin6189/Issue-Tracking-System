import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Footer from "./Footer";
import DashboardTable from "./DashboardTable";
import AdminDashboardTable from "./AdminDashboardTable";
import AdminMain from "./AdminMain";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      {showSidebar && <Sidebar />}
      
      {isAdmin ? <AdminMain /> : <Main />}
      {isAdmin ? <AdminDashboardTable /> : <DashboardTable />}
      <Footer />
    </div>
  );
};

export default Dashboard;