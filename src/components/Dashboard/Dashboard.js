import "./Dashboard.css";
import "./DashboardM.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Videocard from "../VideoCard/Videocard";
import Skeleton from '@mui/material/Skeleton';

const Dashboard = () => {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  var maxResult = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      const TrendData = await axios.get('/videos', {
        params: {
          part: 'snippet, contentDetails, statistics, player',
          chart: 'mostPopular',
          maxResults: 20,
          key: process.env.REACT_APP_YT_API
        }
      });

      if (TrendData) {
        setTrendingVideos(TrendData.data.items);
        setLoading(false);
      }
      // console.log(TrendData.data);
    }
    fetchTrendingVideos();
  }, []);

  return (
    <div className='dashboard-main'>
      <div className="dashboard-container">
        {!loading ? trendingVideos.map((video) => {
          return <Videocard video={video} key={video.id + Math.random()} />
        })
          : maxResult.map((obj) => {
            return (
              <div className='skeleton-main' key={obj}>
                <Skeleton className="skeleton-thumb" variant="rectangular" sx={{ bgcolor: 'var(--secondary-alt)' }} />
                <div className="skeleton-info">
                  <Skeleton className="skeleton-avatar" variant="circular" width={36} height={36} sx={{ bgcolor: 'var(--secondary-alt)' }} />
                  <div className="skeleton-text">
                    <Skeleton variant="text" width="90%" height={20} sx={{ bgcolor: 'var(--secondary-alt)' }} />
                    <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: 'var(--secondary-alt)' }} />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Dashboard
