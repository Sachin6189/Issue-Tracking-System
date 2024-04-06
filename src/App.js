// import logo from './logo.svg';
// import './App.css';
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Dashboard/Navbar/Navbar";
// import Login from "./components/Login/Login";
import BackgroundComponent from "./components/Login/BackgroundComponent";
import LeftDivComponent from "./components/Login/LeftDivComponent";
import LoginFormComponent from "./components/Login/LoginForm";

function App() {
  return (
    <div >
     {/* <Dashboard /> */}
      {/* <Login /> */}
      <BackgroundComponent>
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row h-auto md:h-96 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 relative">
        <LeftDivComponent />
        <LoginFormComponent />
      </div>
    </BackgroundComponent>
    </div>
  );
}

export default App;
