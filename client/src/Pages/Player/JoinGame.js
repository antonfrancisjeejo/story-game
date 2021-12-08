import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { setStory } from "../../store/actions/story";

const JoinGame = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gameIdRef = useRef("");

  const joinGame = async () => {
    const token = localStorage.getItem("userToken");
    const response = await axios.get(`/story/get/${gameIdRef.current.value}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    await axios.put(
      `/story/play/${gameIdRef.current.value}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(setStory(response.data.story));
    navigate(`/start/${gameIdRef.current.value}`);
  };

  return (
    <div className="flex justify-center items-center h-[90vh] flex-col">
      <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-lg w-[600px] py-8">
        <h1 className="font-bold text-3xl">Insert your code</h1>
        <input
          ref={gameIdRef}
          type="text"
          placeholder="Game Id"
          className="outline-none border-solid border-gray-400 rounded-md border mt-7 w-[500px] px-2 py-3 text-lg font-semibold"
        />
        <button
          onClick={joinGame}
          className="uppercase text-lg font-semibold text-white bg-yellow-400 py-2 px-24 rounded-md mt-3"
        >
          Join the game
        </button>
      </div>
    </div>
  );
};

export default JoinGame;
