import React, { useEffect, useRef } from 'react';
import flv from 'flv.js';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = () => {
  const router = useRouter();
  const videoRef = useRef();
  const id = router.query.id;
  const stream = useSelector(state => state.streams[id]);
  const dispatch = useDispatch();
  let player = null;

  useEffect(() => {
    dispatch(fetchStream(id));
  }, [dispatch, id]);

  useEffect(() => {
    buildPlayer();
    return () => player.destroy();
  });

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

  if (!stream) {
    return <div>Loading...</div>;
  }
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
