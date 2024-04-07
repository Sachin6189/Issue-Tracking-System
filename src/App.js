import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import RaiseTicket from "./components/Dashboard/RaiseTicket";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/raiseTicket" element={<RaiseTicket />} />
      </Routes>
    </Router>
  );
}

export default App;
