import React from 'react';
import PropTypes from 'prop-types';
import replaceStringsYouTube from '../../services/replaceStringsYouTube';

const VideoFrame = ({ videoURL, videoTitle }) => (
  <div>
    <h4>Vídeo:</h4>
    <iframe
      title={videoTitle}
      data-testid="video"
      width="300"
      height="315"
      src={replaceStringsYouTube(videoURL)}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

export default VideoFrame;

VideoFrame.propTypes = {
  videoTitle: PropTypes.string.isRequired,
  videoURL: PropTypes.string.isRequired,
};
