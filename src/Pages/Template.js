import React from "react";
import { useNavigate } from "react-router-dom";
const Template = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/");
  };
  return (
    <div>
      <div
        onClick={handleSubmit}
        className=" w-1/4  mt-[300px] text-2xl font-bold bg-green-700 text-white rounded-full hover:bg-green-800  flex items-center justify-center
        mx-auto   cursor-pointer"
      >
        Create Template
      </div>
    </div>
  );
};

export default Template;
