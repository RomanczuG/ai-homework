import React from 'react';
import { LiteYouTubeEmbed } from 'react-lite-youtube-embed';

const YouTubeVideo = ({ embedId }) => (
  <div className="video-responsive">
    <LiteYouTubeEmbed
      id={embedId}
      poster="hqdefault"
      wrapperClass="video-wrapper"
    />
  </div>
);

export default YouTubeVideo;
