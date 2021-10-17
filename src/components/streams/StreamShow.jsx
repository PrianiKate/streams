import React, { useEffect, useRef } from 'react';
import flv from 'flv.js';

const StreamShow = (stream) => {
  const videoRef = useRef();
  let player = null;

  const buildPlayer = () => {
    if (player || !stream) {
      return;
    }
    
    player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${stream.id}.flv`
    });
    player.attachMediaElement(videoRef.current);
    player.load();
  }

  useEffect(() => {
    buildPlayer();
    return () => player.destroy();
  });

  const { title, description } = stream;

  return (
    <div>
      <video 
        ref={videoRef} 
        style={{ width: '100%' }} 
        controls
      />
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  );
}

export default StreamShow;
