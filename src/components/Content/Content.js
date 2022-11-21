import React from 'react'

const Content = ({video}) => {
    const {title, thumbnails} = video;
    var url = thumbnails[0].url;
    console.log(url);
  return (
    <div className='content-main' style={{marginLeft:"16em"}}>
        <img src={url} alt={title} />
    </div>
  )
}

export default Content
