import React from "react";
import Logo from "./Logo";
import LoginForm from "./LoginForm";
import background from "../assets/bg1.jpg";
import flaticon1 from "../assets/flaticon1.png";
import flaticon2 from "../assets/flaticon2.png";
import flaticon3 from "../assets/flaticon3.png";

const Login = () => {
  return (
    <div
      className="flex justify-center items-center h-screen relative"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row h-auto md:h-96 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 relative">
        <div className="w-full md:w-1/2 bg-white rounded-3xl relative overflow-hidden">
          <Logo />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <img src={flaticon1} alt="Circle 1" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <img src={flaticon2} alt="Circle 2" className="w-full h-full" />
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={flaticon3} alt="Circle 3" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
