import React from "react";
import divbg from "../assets/bg2.jpg";
import flaticon1 from "../assets/flaticon1.png";
import flaticon2 from "../assets/flaticon2.png";
import flaticon3 from "../assets/flaticon3.png";

const LeftDivComponent = () => {
  return (
    <div className="w-full md:w-1/2 bg-white rounded-3xl relative overflow-hidden">
      <h1 className="text-center font-semibold text-4xl mb-6 text-black absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        Welcome to <span className="font-bold italic">iTicket</span>!
      </h1>
      <p className="text-center text-gray-600 font-bold mb-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        We are a community, together helping thousands of people.
      </p>
      <img
        src={divbg}
        alt="Login"
        className="absolute h-full w-full object-cover p-5 rounded-3xl"
      />
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
  );
};

export default LeftDivComponent;
