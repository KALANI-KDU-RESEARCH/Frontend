import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoPlayer from "./VideoPlayer";

const API_KEY = "AIzaSyAYGRwaUfihScZndNJSOzMhuQXqM7wg1kA"; // Replace with your API key

const VideoSearch = ({ keyword }) => {
  const [videos, setVideos] = useState([]);

  const handleSearch = async (keyword) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: API_KEY,
            q: "Micro Entrepreneur" + keyword,
            part: "snippet",
            maxResults: 2,
            type: "video",
          },
        }
      );

      setVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  console.log("VIDEOS", videos)

  useEffect(() => {
    handleSearch(keyword);
  }, []);

  return (
    <div>
      <div>
        {videos.map((video) => (
          <div key={video.id.videoId} className=" w-full">
            <VideoPlayer videoId={video.id.videoId} /><br/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSearch;
