import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStreams } from '../../actions';

const StreamList = () => {
  const dispatch = useDispatch();
  const streams = Object.values(useSelector(state => state.streams));
  const currentUserId = useSelector(state => state.auth.userId);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);

  useEffect(() => {
    dispatch(fetchStreams());
  }, [dispatch]);

  const renderAdmin = (stream) => {
    if (stream.userId === currentUserId) {
      return (
        <div className="right floated content">
          <Link 
            href={`/streams/edit/${stream.id}`} 
          >
            <div className="ui button primary">
              Edit
            </div>
          </Link>
          <Link 
            href={`/streams/delete/${stream.id}`} 
          >
            <div className="ui button negative">
              Delete
            </div>
          </Link>
        </div>
      );
    }
  }

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link href="/streams/new">
            <div className="ui button primary">
              Create stream
            </div>
          </Link>
        </div>
      );
    }
  }

  const renderList = () => {
    return streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}
          <i className="large middle aligned icon camera"></i>
          <div className="content">
            <Link href={`/streams/${stream.id}`}>
              <a className="header">
                {stream.title}
              </a>
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );
}
 
export default StreamList;