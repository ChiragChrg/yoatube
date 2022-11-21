import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';

function App() {
  const [toggleNav, setToggleNav] = useState(false);
  const [trendingVideos, setTrendingVideos] = useState([]);

  useEffect(() => {
    axios.get('/trending/').then((res) => {
      setTrendingVideos(res.data.videos);
    });
  }, []);

  return (
    <div className="App">
      <Header setToggleNav={setToggleNav}/>
      <Sidebar toggleNav={toggleNav}/>

      <div className="content-container">
        {trendingVideos.map((video) => {
          return <Content video={video} key={video.video_id+Math.random()}/>
        })}
      </div>
    </div>
  );
}

export default App;
