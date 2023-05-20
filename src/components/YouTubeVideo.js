import React from 'react';
import ReactPlayer from 'react-player'

const YouTubeVideo = ({ embedId }) => (
  <div className="video-responsive">
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${embedId}`}
      playing
      muted
      controls
      width="853px"
      height="480px"
      config={{
        youtube: {
          playerVars: { 
            showinfo: 1, 
            controls: 1,
            modestbranding: 1, 
            rel: 0
          }
        },
      }}
    />
  </div>
);

export default YouTubeVideo;

