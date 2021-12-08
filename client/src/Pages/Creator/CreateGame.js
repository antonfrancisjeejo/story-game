import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import copy from "clipboard-copy";
import { ClipboardCopyIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const CreateGame = () => {
  const [gameId, setGameId] = useState(uuidv4());

  const navigate = useNavigate();

  const copyGameId = () => {
    copy(gameId);
    alert("Game Id has been copied");
  };

  const createGame = async () => {
    const token = localStorage.getItem("userToken");
    await axios.post(
      "/story/create",
      {
        id: gameId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    navigate(`/game-creator/${gameId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-2xl font-semibold text-white">
        The unique code for your game is
      </h1>
      <div className="bg-white shadow-lg rounded-md flex w-[500px] py-5 justify-between px-2 mt-5">
        <h1 className="text-xl font-medium pl-2">{gameId}</h1>
        <button onClick={copyGameId}>
          <ClipboardCopyIcon className="w-7 h-7 hover:text-blue-500" />
        </button>
      </div>
      <button
        onClick={createGame}
        className="uppercase text-lg font-semibold text-white bg-yellow-400 py-2 px-24 rounded-md mt-10"
      >
        Create my game
      </button>
    </div>
  );
};

export default CreateGame;
