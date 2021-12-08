import React from "react";
import { useParams } from "react-router-dom";
import copy from "clipboard-copy";
import { ClipboardCopyIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";

const CreatedGame = () => {
  const story = useSelector((state) => state.storyData.story);

  const { id } = useParams();
  const copyGameId = () => {
    copy(id);
    alert("Game Id has been copied");
  };
  return (
    <div className="flex justify-center items-center h-[90vh] flex-col">
      <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-lg w-[600px] py-8">
        <h1 className="font-bold text-3xl line-clamp-1 text-center">
          {story.title}
        </h1>
        <h1 className="text-xl font-semibold pt-7">Invite a friend to play</h1>
        <div className="bg-white shadow-lg rounded-md flex w-3/4 py-5 justify-between px-2 mt-1">
          <h1 className="text-xl font-medium pl-2">{id}</h1>
          <button onClick={copyGameId}>
            <ClipboardCopyIcon className="w-7 h-7 hover:text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatedGame;
