import React, { Children } from "react";
import background from "../assets/bg1.jpg";

const BackgroundComponent = () => {
  return (
    <div
      className="flex justify-center items-center h-screen relative"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
   
    </div>
  );
};

export default BackgroundComponent;
