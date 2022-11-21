import "./Content.css";
import "./ContentM.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Videocard from "../VideoCard/Videocard";

const Content = () => {
  const [trendingVideos, setTrendingVideos] = useState([]);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      const TrendData = await axios.get('/trending/');
      setTrendingVideos(TrendData.data.videos);
      console.log(TrendData.data.videos);
    }
    fetchTrendingVideos();
  }, []);

  return (
    <div className='content-main'>
      <div className="content-container">
        {trendingVideos.map((video) => {
          return <Videocard video={video} key={video.video_id + Math.random()} />
        })}
      </div>
    </div>
  )
}

export default Content
