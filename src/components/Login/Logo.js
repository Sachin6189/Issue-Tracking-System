import React from "react";
// import background from "../assets/bg1.jpg";
import divbg from "../assets/bg2.jpg";

const Logo = () => {
  return (
    <div>
      <h1 className="text-center font-semibold text-4xl mb-6 text-black absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        Welcome to <span className="font-bold italic">iTicket</span>!
      </h1>
      <p className="text-center text-gray-600 font-bold mb-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        We are a community, together helping thousands of people.
      </p>
      <img
        src={divbg}
        alt="Login Image"
        className="absolute h-full w-full object-cover p-5 rounded-3xl"
      />
    </div>
  );
};

export default Logo;