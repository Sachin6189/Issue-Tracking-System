import React, { useState } from "react";
import axios from "axios";
import { isLength } from "validator";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateInput();

    if (isValid) {
      try {
        const response = await axios.post("/api/login", { username, password });
        // Handle successful login
      } catch (error) {
        // Handle error
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
    } else if (!isLength(passwordValue, { min: 8 })) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  return (
    <div>
      <h2 className="text-center font-semibold text-4xl mb-6 text-black italic">
        Get Started
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
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
            className="appearance-none bg-transparent border-b-2 border-blue-400 w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:border-blue-400"
            placeholder="Enter Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            className="appearance-none bg-transparent border-b-2 border-blue-400 w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:border-blue-400"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
