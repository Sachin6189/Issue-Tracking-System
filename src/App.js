import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import RaiseTicket from "./components/Dashboard/RaiseTicket";
// import ReplyTicket from "./components/Dashboard/ReplyTicket";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/raiseTicket" element={<RaiseTicket />} />
      </Routes>
    </Router>
    // <ReplyTicket/>
  );
}

export default App;
