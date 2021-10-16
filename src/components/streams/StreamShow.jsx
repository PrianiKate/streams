import React, { useEffect, useRef } from 'react';
import flv from 'flv.js';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_STREAM_BY_ID_QUERY } from '../../apis/graghQL';

const StreamShow = () => {
  const router = useRouter();
  const videoRef = useRef();
  const id = router.query.id;
  
  let player = null;

  const buildPlayer = () => {
    if (player || !stream) {
      return;
    }
    
    player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    player.attachMediaElement(videoRef.current);
    player.load();
  }

  useEffect(() => {
    buildPlayer();
    return () => player.destroy();
  });

  const { data, loading, error } = useQuery(GET_STREAM_BY_ID_QUERY, {
    id
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const stream = data.Stream;

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
