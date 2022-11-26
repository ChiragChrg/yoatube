import "./Videocard.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { parse } from "tinyduration";

const Videocard = ({ video }) => {
    var { title, thumbnails, channelId, channelTitle } = video.snippet;
    var { duration } = video.contentDetails;
    var { viewCount } = video.statistics;

    //Dotter overflowing Title
    if (title.length > 55) {
        var Title = title.substring(0, 55) + '...';
    } else {
        Title = title;
    }

    //Thumbnail img
    // var url = thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.standard?.url || thumbnails.default?.url;
    var url = thumbnails.standard?.url || thumbnails.medium?.url || thumbnails.high?.url || thumbnails.default?.url || thumbnails.maxres?.url;

    //Timestamp formatting
    const [channelData, setChannelData] = useState([]);
    let { hours, minutes, seconds } = parse(duration);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = hours > 0 ? minutes < 10 ? `0${minutes}` : minutes : minutes;
    let timestamp;
    hours ? timestamp = `${hours || '0'}:${minutes || '00'}:${seconds || '00'}`
        : timestamp = `${minutes || '00'}:${seconds || '00'}`;

    //Views formatting
    var views = Intl.NumberFormat('en', { notation: "compact" }).format(viewCount);

    //Upload date formatting
    var publishDate = new Date(video.snippet.publishedAt);
    var currentDate = new Date();
    var diff = currentDate - publishDate;

    var hrs = Math.floor(diff / (1000 * 60 * 60));
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    var years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    var uploadDate;
    if (hrs < 24) {
        uploadDate = `${hrs} hours ago`;
    }
    else if (days < 30) {
        uploadDate = `${days} days ago`;
    }
    else if (months < 12) {
        uploadDate = `${months} months ago`;
    }
    else {
        uploadDate = `${years} years ago`;
    }

    useEffect(() => {
        const GetChannelData = async () => {
            const ChannelData = await axios.get(`/channels`, {
                params: {
                    part: 'snippet,statistics',
                    id: channelId,
                    key: process.env.REACT_APP_YT_API
                }
            });
            setChannelData(ChannelData.data.items[0]);
            // console.log(ChannelData);
        }
        GetChannelData();
    }, [channelId]);

    var VideoProp = {
        video,
        channelData,
        Title,
        uploadDate,
        views
    }


    return (
        <div className='videocard-main'>
            <Link to={`/watch=${video.id}`} className='videocard-thumb' state={VideoProp}>
                <span className="videocard-timestamp">{timestamp}</span>
                <img src={url} alt={title} />
            </Link>
            <div className="videocard-info">
                <div className="videocard-avatar">
                    <img
                        src={channelData.snippet?.thumbnails?.default.url}
                        alt={channelData.snippet?.title}
                        width="36"
                        height="36"
                    />
                </div>
                <div className="videocard-details flex col">
                    <div className="videocard-title">{Title}</div>
                    <div className="videocard-channel flex col">
                        <div className="videocard-channelName">{channelTitle}</div>
                        <div className="videocard-footer">
                            <div className="videocard-views">{views}</div>
                            <div className="videocard-uploaded">{uploadDate}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Videocard