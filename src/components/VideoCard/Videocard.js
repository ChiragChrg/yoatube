import React from 'react'

const Videocard = ({ video }) => {
    var { title, thumbnails } = video;
    var url = thumbnails[thumbnails.length - 1].url;

    return (
        <div className='videocard-main'>
            <img src={url} alt={title} />
        </div>
    )
}

export default Videocard