import React, { useEffect } from "react";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axios";
import { setStory } from "../../store/actions/story";

const StartGame = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const story = useSelector((state) => state.storyData.story);

  useEffect(() => {
    const fetchStory = async () => {
      if (!story) {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`/story/get/${id}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });
        dispatch(setStory(response.data.story));
      }
    };
    fetchStory();
  }, []);

  const startGame = () => {
    navigate("/play");
  };

  if (!story) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div class="loader"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[90vh] flex-col">
      <div className="bg-white rounded-md shadow-lg w-[600px] h-60">
        <div className="flex flex-col justify-center items-center py-8">
          <h1 className="font-bold text-3xl">Welcome to</h1>
          <h1 className="text-2xl font-semibold pt-8 line-clamp-1">
            {story?.title}
          </h1>
        </div>
        <div className="text-right">
          <button
            onClick={startGame}
            className="uppercase text-lg inline-flex font-semibold text-white bg-yellow-400 py-2 px-8 rounded-md mt-3 mr-5"
          >
            <span className="pr-2">Begin</span>
            <ArrowNarrowRightIcon className="h-7 w-9" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartGame;
