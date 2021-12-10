import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GameResult = () => {
  const storyData = useSelector((state) => state.storyData);

  const navigate = useNavigate();

  if (!storyData.story || !storyData.resultStory) {
    navigate("/home");
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white w-2/4 max-w-max pb-10 my-10">
        <h1 className="bg-gray-800 text-white text-2xl font-semibold text-center py-3">
          {storyData?.story?.title}
        </h1>
        <p className="leading-10 px-10 pt-10 pb-5">
          {storyData.resultStory.map((word, index) => {
            if (typeof word === "object") {
              return (
                <span key={index} className={word.className}>
                  {word.result}{" "}
                </span>
              );
            }
            return " " + word + " ";
          })}
        </p>

        <h3 className="text-xl text-center">The End!</h3>
        <div className="text-right">
          <button
            onClick={() => navigate("/home")}
            className="uppercase text-lg font-semibold text-white bg-yellow-400 py-2 px-5 rounded-md mt-2 mr-10"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameResult;
