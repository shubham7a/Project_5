import React, { useState } from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import { SiLivechat } from "react-icons/si";
import { useNavigate, Link } from "react-router-dom";

const Sideview = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleSubmit = () => {
    navigate("/template");
  };

  const handleMouseEnter = (buttonName) => {
    setHoveredButton(buttonName);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <div className="w-[20%] h-full text-white flex flex-col justify-start bg-gray-600 border rounded-lg relative">
      <div className="px-2 py-2 mt-4 flex flex-col justify-between space-y-4">
        {/* Live Chat Button */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("Live Chat")}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/chat">
            <button className="mt-6">
              <SiLivechat className="text-5xl p-2 hover:bg-blue-600 rounded-lg duration-300" />
            </button>
          </Link>
          {hoveredButton === "Live Chat" && (
            <div className="absolute left-[70px] top-5 p-2 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg transition-opacity duration-300 opacity-100">
              {hoveredButton}
            </div>
          )}
        </div>

        {/* Template Creation Button */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("Template Creation")}
          onMouseLeave={handleMouseLeave}
        >
          <button onClick={handleSubmit} className="mt-6">
            <BiMessageRoundedDots className="text-5xl p-2 hover:bg-blue-600 rounded-lg duration-300" />
          </button>
          {hoveredButton === "Template Creation" && (
            <div className="absolute left-[70px] top-5 p-2 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg transition-opacity duration-300 opacity-100">
              {hoveredButton}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sideview;
