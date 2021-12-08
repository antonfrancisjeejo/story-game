import React, { useEffect, useState } from "react";
// import storyData from "./storyData";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setResultStory } from "../../store/actions/story";

const PlayGame = () => {
  const storyData = useSelector((state) => state.storyData.story);
  const [story, setStory] = useState(storyData?.story);

  const [gameContest, setGameContest] = useState([]);

  const [wordInput, setWordInput] = useState("");

  const [nextWord, setNextWord] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setGameContest(
      story
        .map((word, index) => {
          return typeof word === "object" ? { ...word, index } : "";
        })
        .filter((word, index) => {
          return typeof word === "object";
        })
    );
  }, []);

  const moveNextWord = (wordIndex) => {
    console.log(wordIndex);
    setStory((prev) => {
      return prev.map((word, index) => {
        return index === wordIndex ? { ...word, result: wordInput } : word;
      });
    });
    setWordInput("");
    setNextWord((prev) => prev + 1);
  };

  const seeResult = (wordIndex) => {
    let resultStry = [];
    resultStry = story.map((word, index) => {
      return index === wordIndex ? { ...word, result: wordInput } : word;
    });
    setStory((prev) => {
      return prev.map((word, index) => {
        return index === wordIndex ? { ...word, result: wordInput } : word;
      });
    });
    setWordInput("");
    console.log(resultStry);
    console.log(story);
    dispatch(setResultStory(resultStry));
    navigate("/result");
  };
  // setWordIndex(game.index);

  if (!story) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex justify-center items-center h-[90vh] flex-col">
      {gameContest.map((game, index) => {
        if (index === nextWord - 1) {
          return (
            <div
              className="bg-white rounded-md shadow-lg w-[600px] h-64"
              key={index}
            >
              <div
                className="flex flex-col justify-center items-center py-8"
                key={index}
              >
                <h1 className="font-bold text-3xl">
                  {index + 1}. {game.text}
                </h1>
                <input
                  value={wordInput}
                  onChange={(e) => setWordInput(e.target.value)}
                  type="text"
                  placeholder={`Enter a ${game.text.toLowerCase()}`}
                  className="outline-none border-solid border-gray-400 rounded-md border mt-5 w-[500px] px-2 py-3 text-lg font-semibold"
                />
              </div>

              {nextWord < gameContest.length ? (
                <div className="text-right">
                  <button
                    onClick={() => moveNextWord(game.index)}
                    className="uppercase text-lg inline-flex font-semibold text-white bg-yellow-400 py-2 px-8 rounded-md mt-3 mr-5"
                  >
                    <span className="pr-2">Next</span>
                    <ArrowNarrowRightIcon className="h-7 w-9" />
                  </button>
                </div>
              ) : (
                <div className="text-right">
                  <button
                    onClick={() => seeResult(game.index)}
                    className="uppercase text-lg inline-flex font-semibold text-white bg-yellow-400 py-2 px-8 rounded-md mt-3 mr-5"
                  >
                    <span className="pr-2">See Result</span>
                    <ArrowNarrowRightIcon className="h-7 w-9" />
                  </button>
                </div>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default PlayGame;
