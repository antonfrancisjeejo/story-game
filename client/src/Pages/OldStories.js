import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import axios from "../axios";

const OldStories = () => {
  const [oldStories, setOldStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("userToken");
      try {
        const response = await axios.get("/user/stories", {
          headers: {
            authorization: token,
          },
        });
        setOldStories([
          ...response.data.user.storiesCreated,
          ...response.data.user.storiesPlayed,
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white min-w-[40%] max-w-max pb-10 my-10">
        <h1 className="text-2xl font-semibold text-center py-3">Old Stories</h1>
        {oldStories.length > 0 ? (
          <div className="pl-10">
            {oldStories.map((story, index) => (
              <h1 key={story._id} className="text-lg font-semibold py-2">
                {index + 1}. {story.title}
              </h1>
            ))}
          </div>
        ) : (
          <h3 className="text-center mt-5 font-bold text-xl">No Stories</h3>
        )}
        <div className="text-left">
          <button
            onClick={() => navigate("/home")}
            className="uppercase inline-flex text-lg font-semibold text-white bg-yellow-400 py-2 px-5 rounded-md mt-5 ml-10"
          >
            <ArrowNarrowLeftIcon className="h-7 w-9" />
            <span className="pl-1">Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OldStories;
