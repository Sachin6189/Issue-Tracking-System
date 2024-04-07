import React, { useState } from "react";
import BackgroundComponent from "./BackgroundComponent";
import LeftDivComponent from "./LeftDivComponent";
import LoginFormComponent from "./LoginForm";

const Login = () => {

  return (
    <BackgroundComponent>
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row h-auto md:h-96 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 relative">
        <LeftDivComponent />
        <LoginFormComponent />
      </div>
    </BackgroundComponent>
  );
};

export default Login;
