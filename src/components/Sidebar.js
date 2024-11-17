import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../redux/Slices/AuthSlice";
import Sideview from "./Sideview";

const Sidebar = ({ setCurrentChat }) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMouseEnter = (buttonName) => {
    setHoveredButton(buttonName);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <div className="flex h-screen bg-gray-800">
      <Sideview />
      <div className="w-1/4 md:w-64 text-white flex flex-col p-4 h-full overflow-y-auto">
        <div className="flex justify-between mb-6 p-3 bg-gray-700 rounded-lg">
          <h1 className="text-xl font-semibold">Chat</h1>
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("Logout")}
            onMouseLeave={handleMouseLeave}
          >
            <button onClick={handleLogout} className="p-2">
              <FiLogOut className="text-4xl hover:bg-blue-600 rounded-full p-1 duration-300 absolute top-[-5px] left-[-20px]" />
            </button>
            {hoveredButton === "Logout" && (
              <div className="absolute left-[-90px] top-[-5px] p-2 bg-gray-700 text-white text-sm font-semibold rounded-lg shadow-lg transition-opacity duration-300 opacity-100">
                {hoveredButton}
              </div>
            )}
          </div>
        </div>

        <div className="flex-grow">
          <div className="space-y-2">
            <button
              onClick={() => setCurrentChat(user?.PhoneNumber)}
              className="block w-full p-2 text-left rounded hover:bg-green-700 focus:bg-gray-700"
            >
              {user ? user.PhoneNumber : "Contact 1"}
            </button>
          </div>
        </div>

        
        <div className="mt-auto space-y-6">
          <div className="space-y-1">
            <label htmlFor="From" className="block text-gray-300 text-sm font-medium">
              From
            </label>
            <input
              type="text"
              id="From"
              placeholder="Type to search..."
              className="w-full p-3 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="To" className="block text-gray-300 text-sm font-medium">
              To
            </label>
            <select
              id="To"
              className="w-full p-3 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Choose a Phone Number">Choose a Phone Number</option>
              <option value="PhoneNumber1">9935958921</option>
              <option value="PhoneNumber2">6387912345</option>
              <option value="PhoneNumber3">7985123456</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
