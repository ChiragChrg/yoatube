import "./Dashboard.css";
import "./DashboardM.css";
import { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
// import Videocard from "../VideoCard/Videocard";
const Videocard = lazy(() => import('../VideoCard/Videocard'));

const Dashboard = () => {
  const [trendingVideos, setTrendingVideos] = useState([]);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      const TrendData = await axios.get('/videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 20,
          key: process.env.REACT_APP_YT_API
        }
      });
      setTrendingVideos(TrendData.data.items);
      // console.log(TrendData.data);
    }
    fetchTrendingVideos();
  }, []);

  return (
    <div className='dashboard-main'>
      <div className="dashboard-container">
        {trendingVideos.map((video) => {
          return <Suspense fallback={<div>Loading...</div>} key={video.id + Math.random()}>
            <Videocard video={video} />
          </Suspense>
        })}
      </div>
    </div>
  )
}

export default Dashboard
