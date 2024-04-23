import React, { useState } from "react";
import axios from "axios";
import { isLength } from "validator";
import { useNavigate } from "react-router-dom";
// import users from "./user.json";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [empId, setEmpId] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateInput();

    if (isValid) {
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          username,
          password,
        });

        if (response.status === 200) {
          const { emp_id, emp_name } = response.data;
          sessionStorage.setItem("username", emp_name);
          sessionStorage.setItem("emp_id", emp_id);
          setEmpId(emp_id);
        
          navigate("/dashboard");
        } else {
          setPasswordError("Invalid Credentials");
        }
      } catch (error) {
        console.error(error);
        setPasswordError("Please enter valid credentials.");
      }
    }
  };

  const validateInput = () => {
    const usernameValue = username.trim();
    const passwordValue = password.trim();

    let isValid = true;

    if (usernameValue === "") {
      setUsernameError("Username is required");
      isValid = false;
    } else if (!isLength(usernameValue, { min: 3, max: 20 })) {
      setUsernameError("Username must be between 3 and 20 characters");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (passwordValue === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  return (
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
          {usernameError && <p className="text-red-500">{usernameError}</p>}
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
          {passwordError && <p className="text-red-500">{passwordError}</p>}
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
  );
};

export default LoginForm;
