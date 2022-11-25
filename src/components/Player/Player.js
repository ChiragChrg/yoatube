import "./Player.css";
import { useState } from 'react'
// import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'
import { FaBell, FaRegBell, FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'

const Player = () => {
    const [like, setLike] = useState(null);
    const [subbed, setSubbed] = useState(false);
    const [notify, setNotify] = useState(false);

    //Alt Like and Dislike Btns
    const ToggleLike = () => {
        if (like === true) {
            setLike(null);
        } else setLike(prev => prev === true ? false : true);
    }

    const ToggleDislike = () => {
        if (like === false) {
            setLike(null);
        } else setLike(prev => prev === false ? true : false);
    }

    const location = useLocation();
    const { videoId } = useParams();
    const { Title, channelData, video } = location.state;
    // const { Title, channelData, uploadDate, video, views } = location.state;

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const subscribers = Intl.NumberFormat('en', { notation: "compact" }).format(channelData.statistics.subscriberCount);
    const likes = Intl.NumberFormat('en', { notation: "compact" }).format(video.statistics.likeCount);

    return (
        <div className='Player-main flex col'>
            <ReactPlayer playing={false} className="Player-player" url={videoUrl} controls={true} width="100%" height="100%" />

            <div className="Player-details flex col w-100">
                <h3>{Title}</h3>
                <div className="Player-info">
                    <div className="Player-MobSection flex gap-1">
                        <div className="Player-channel">
                            <div className="Player-ChLogo">
                                <img
                                    src={channelData.snippet?.thumbnails?.default.url}
                                    alt={channelData.snippet?.title}
                                    width="40"
                                    height="40"
                                />
                            </div>

                            <div className="Player-channelInfo flex col">
                                <h4 className="Player-channelName">{channelData.snippet.title}</h4>
                                <span className="Player-subscribers">{subscribers} subscribers</span>
                            </div>
                        </div>

                        <div onClick={() => setSubbed(prev => !prev)} className={!subbed ? "Player-subBtn sub" : "Player-subBtn subbed"}>
                            <input type="button" value="Subscribe" />
                        </div>
                    </div>

                    <div className="Player-MobLike flex gap-1">
                        <div className="Player-LikeBtns">
                            <div className="Player-like flex gap-05" onClick={ToggleLike}>
                                {like === true ? <FaThumbsUp size={24} color="var(--text)" />
                                    : <FaRegThumbsUp size={25} color="var(--text)" />}
                                <span>{likes}</span>
                            </div>
                            <div className="Player-dislike flex" onClick={ToggleDislike}>
                                {like === false ? <FaThumbsDown size={24} color="var(--text)" />
                                    : <FaRegThumbsDown size={25} color="var(--text)" />}
                            </div>
                        </div>

                        <div className="Player-notification flex" onClick={() => setNotify(prev => !prev)}>
                            {!notify ? <FaRegBell size={25} color="var(--text)" />
                                : <FaBell size={25} color="var(--text)" />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player