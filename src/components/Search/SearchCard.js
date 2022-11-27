import "./SearchCard.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { parse } from "tinyduration";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const SearchCard = ({ video }) => {
    const [videoData, setVideoData] = useState([]);
    var { title, thumbnails, channelId, channelTitle, publishedAt } = video.snippet;

    useEffect(() => {
        const GetVideoData = async () => {
            const { data } = await axios.get(`/videos`, {
                params: {
                    part: 'contentDetails,statistics',
                    id: video.id.videoId,
                    key: process.env.REACT_APP_YT_API
                }
            });

            const ChannelData = await axios.get(`/channels`, {
                params: {
                    part: 'snippet,statistics',
                    id: channelId,
                    key: process.env.REACT_APP_YT_API
                }
            });
            console.log(ChannelData);

            setVideoData({
                contentDetails: data.items[0].contentDetails,
                statistics: data.items[0].statistics,
                channelData: ChannelData.data.items[0]
            });
        }
        GetVideoData();
    }, [video.id.videoId]);
    // console.log(videoData);

    //Dotter overflowing Title
    if (title.length > 55) {
        var Title = title.substring(0, 55) + '...';
    } else {
        Title = title;
    }

    //Thumbnail img
    var url = thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.standard?.url || thumbnails.default?.url;

    //Timestamp formatting
    let duration = videoData?.contentDetails?.duration;
    let { hours, minutes, seconds } = duration ? parse(duration) : { hours: 0, minutes: 0, seconds: 0 };
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = hours > 0 ? minutes < 10 ? `0${minutes}` : minutes : minutes;
    let timestamp;
    hours ? timestamp = `${hours || '0'}:${minutes || '00'}:${seconds || '00'}`
        : timestamp = `${minutes || '00'}:${seconds || '00'}`;

    //Views formatting
    var views = Intl.NumberFormat('en', { notation: "compact" }).format(videoData?.statistics?.viewCount);

    //Upload date formatting
    var publishDate = new Date(publishedAt);
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

    var VideoProp = {
        video: { ...video, ...videoData },
        channelData: videoData?.channelData,
        Title,
        uploadDate,
        views
    }

    return (
        <div className='videocard-main'>
            <Link to={`/watch=${video.id.videoId}`} className='videocard-thumb' state={VideoProp}>
                <span className="videocard-timestamp">{timestamp}</span>
                <LazyLoadImage src={url} alt={title} effect="blur" />
            </Link>
            <div className="videocard-info">
                <div className="videocard-avatar">
                    <LazyLoadImage
                        src={videoData.channelData?.snippet?.thumbnails?.default?.url}
                        alt={channelTitle}
                        width={36}
                        height={36}
                        effect="blur" />
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

export default SearchCard