import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-[90vh] flex-col">
      <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-lg w-[600px] py-8">
        <h1 className="font-bold text-5xl">Mad Libs</h1>
        <button
          onClick={() => navigate("/login")}
          className="uppercase text-lg font-semibold text-white bg-[#F38100] py-2 px-[85px] rounded-md mt-10"
        >
          Login
        </button>
        <br />
        <button
          onClick={() => navigate("/signup")}
          className="uppercase text-lg font-semibold text-white bg-yellow-400 py-2 px-[75px] rounded-md"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Welcome;
