import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { autoLogout } from "../store/actions/auth";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(autoLogout());
  };

  return (
    <div className="flex justify-center items-center h-[90vh] flex-col">
      <div className="bg-white rounded-md shadow-lg w-[600px]">
        <div className="flex flex-col justify-center items-center pt-8">
          <h1 className="font-bold text-5xl">Welcome</h1>
          <button
            onClick={() => navigate("/create")}
            className="uppercase text-lg font-semibold text-white bg-yellow-400 py-2 px-[85px] rounded-md mt-10"
          >
            Create a Game
          </button>
          <br />
          <button
            onClick={() => navigate("/join")}
            className="uppercase text-lg font-semibold text-white bg-yellow-400 py-2 px-24 rounded-md"
          >
            Join a Game
          </button>
          <br />
          <button
            onClick={() => navigate("/oldstories")}
            className="uppercase text-lg font-semibold text-white bg-purple-600 py-2 px-20 rounded-md mt-1"
          >
            Read Old Stories
          </button>
          <br />
        </div>
        <div className="text-right mb-2">
          <button
            onClick={userLogout}
            className="text-lg inline-flex font-semibold text-white bg-red-400 py-1 px-6 rounded-md mt-1 mr-5"
          >
            <span className="pr-2">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
