// src/components/VideoPlayer.js
import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId }) => {
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0, // Auto-play the video when the player loads
            controls: 1, // Show only the play button (0 hides all controls, 1 shows play/pause, and seek bar)
            modestbranding: 1, // Hide YouTube logo
            rel: 0, // Prevents showing related videos at the end
            iv_load_policy: 3, // Hide annotations
        },
    };

    return <YouTube videoId={videoId} opts={opts} />;
};

export default VideoPlayer;
