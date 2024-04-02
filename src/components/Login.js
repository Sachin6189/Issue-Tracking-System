import React from 'react';

const Login = () => {

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-violet-400 to-purple-500 p-8 rounded-lg shadow-md w-96">
        <h2 className="flex flex-col items-center justify-center text-5xl font-semibold mb-4">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="domainId" className="block mb-1 font-semibold">Domain ID:</label>
            <input type="text" id="domainId" name="domainId" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" placeholder='Enter Domain ID' required/>
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold">Password:</label>
            <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" placeholder='Enter Password' required/>
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300 font-semibold text-1xl">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
