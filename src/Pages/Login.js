import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [PhoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login({ PhoneNumber }));
    navigate("/chat");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-500">
      <h1 className="text-2xl mb-4">Enter your Phone Number</h1>
      <input
        type="PhoneNumber"
        value={PhoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter your Phone Number"
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
