import axios from "axios";

export default async function FetchContent(videoId) {
    const { data } = await axios.get(`/videos`, {
        params: {
            part: "contentDetails, statistics",
            id: videoId,
            key: process.env.REACT_APP_YT_API,
        },
    });
    return data;
}