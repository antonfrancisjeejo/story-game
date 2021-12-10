import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { setStory } from "../../store/actions/story";

const GameCreator = () => {
  const [ownField, setOwnField] = useState("");
  const [blanks, setBlanks] = useState([
    "Adjective",
    "Noun",
    "Verb",
    "Adverb",
    "Person",
    "Place",
  ]);
  const titleRef = useRef("");
  const [storyArea, setStoryArea] = useState("");
  const [updatedStory, setUpdatedStory] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    document.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("Text", event.target.innerHTML);
    });
  }, []);

  const addWord = (e) => {
    e.preventDefault();
    setBlanks((prev) => {
      const temp = new Set([
        ...prev,
        ownField.charAt(0).toUpperCase() + ownField.slice(1),
      ]);
      return [...temp];
    });
    setOwnField("");
  };

  const viewStory = () => {
    const words = storyArea.split(" ");
    const updatedWords = words.map((word) => {
      if (blanks.includes(word)) {
        return {
          tag: "span",
          className:
            "text-white bg-gray-900 text-center text-md font-semibold px-3 py-1 mr-1 rounded-md",
          text: word,
        };
      }
      return word;
    });
    console.log(updatedWords);
    setUpdatedStory(updatedWords);
  };

  const createStory = async () => {
    if (!titleRef.current.value) {
      alert("Enter a title");
      return;
    }
    const token = localStorage.getItem("userToken");
    const response = await axios.put(
      `/story/update/${id}`,
      {
        title: titleRef.current.value,
        story: updatedStory,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    dispatch(setStory(response.data.story));
    navigate(`/created-game/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-8">
        <label className="text-2xl font-semibold text-white">Title</label>
        <br />
        <input
          ref={titleRef}
          type="text"
          className="w-[500px] mt-1 outline-none px-2 py-3 text-xl"
        />
      </div>
      <div>
        <label className="text-2xl font-semibold text-white">Story</label>
        <br />
        <textarea
          value={storyArea}
          onChange={(e) => setStoryArea(e.target.value)}
          rows={10}
          className="resize-none w-[500px] mt-1 outline-none px-2 py-3"
        />
      </div>
      <br />
      <div className="flex w-[500px] flex-wrap">
        {blanks.map((word, index) => (
          <p
            key={index}
            className="bg-gray-900 text-center px-10 py-3 rounded-md mr-5 mb-5 cursor-pointer text-white text-lg font-semibold"
            draggable="true"
          >
            {word}{" "}
          </p>
        ))}
        <form
          className="bg-gray-900 text-center px-10 py-3 rounded-md mr-5 mb-5 cursor-pointer"
          onSubmit={addWord}
        >
          <input
            value={ownField}
            onChange={(e) => setOwnField(e.target.value)}
            type="text"
            placeholder="FILL IN YOUR OWN"
            className="outline-none text-white bg-transparent border-b border-white border-solid text-lg font-semibold"
          />
          <button type="submit"></button>
        </form>
      </div>
      <button
        onClick={viewStory}
        className="uppercase text-lg font-semibold text-white bg-purple-600 py-2 px-24 rounded-md mt-10"
      >
        View my story!
      </button>
      {updatedStory && (
        <div className="bg-white w-2/4 p-10 my-10">
          <p className="leading-10">
            {updatedStory.map((word, index) => {
              if (typeof word === "object") {
                return (
                  <span key={index} className={word.className}>
                    {word.text}{" "}
                  </span>
                );
              }
              return " " + word + " ";
            })}
          </p>
          <div className="text-center">
            <button
              onClick={createStory}
              className="uppercase text-lg font-semibold text-white bg-yellow-400 py-2 px-24 rounded-md mt-10"
            >
              Create my story!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCreator;
