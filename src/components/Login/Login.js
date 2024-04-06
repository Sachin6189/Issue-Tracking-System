import React, { useState } from "react";
import divbg from "../assets/bg2.jpg";
import background from "../assets/bg1.jpg";
import flaticon1 from "../assets/flaticon1.png";
import flaticon2 from "../assets/flaticon2.png";
import flaticon3 from "../assets/flaticon3.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");

    console.log(username, password);
  };
  

  
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
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <h2 className="text-center font-semibold text-4xl mb-6 text-black italic">
            Get Started
          </h2>
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold mb-2"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                className="appearance-none bg-transparent border-b-2 border-blue-400 w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:border-blue-400"
                placeholder="Enter Username"
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                className="appearance-none bg-transparent border-b-2 border-blue-400 w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:border-blue-400"
                placeholder="Enter Password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-48"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
