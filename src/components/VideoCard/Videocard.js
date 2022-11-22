import "./Videocard.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Videocard = ({ video }) => {
    var { title, thumbnails, channelId, channelTitle } = video.snippet;
    var url = thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.standard?.url || thumbnails.default?.url;

    const [channelData, setChannelData] = useState([]);

    useEffect(() => {
        const GetChannelData = async () => {
            const ChannelData = await axios.get(`/channels`, {
                params: {
                    part: 'snippet',
                    id: channelId,
                    key: process.env.REACT_APP_YT_API
                }
            });
            setChannelData(ChannelData.data.items[0]);
            // console.log(ChannelData);
        }
        GetChannelData();
    }, [channelId]);

    return (
        <div className='videocard-main'>
            <Link to="/video" className='videocard-thumb'>
                <span className="videocard-duration">05:30</span>
                <img src={url} alt={title} />
            </Link>
            <div className="videocard-info">
                <div className="videocard-avatar">
                    <img src={channelData.snippet?.thumbnails?.default.url} alt={channelData.snippet?.title} />
                </div>
                <div className="videocard-details flex col">
                    <div className="videocard-title flex">{title}</div>
                    <div className="videocard-channel flex col">
                        <div className="videocard-channelName">{channelTitle}</div>
                        <div className="videocard-footer">
                            <div className="videocard-views">views</div>
                            <div className="videocard-uploaded">uploaded</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Videocard