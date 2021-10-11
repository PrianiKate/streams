import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';

const StreamDelete = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;
  const stream = useSelector(state => state.streams[id]);
  useEffect(() => {
    dispatch(fetchStream(id));
  }, [dispatch, id]);

  const renderActions = () => (
      <>
        <button 
          className="ui negative button"
          onClick={() => dispatch(deleteStream(id))}
        >
          Delete
        </button>
        <Link href="/">
          <div className="ui button">Cancel</div>
        </Link>
      </>
    );

  const renderContent = () => {
    if (!stream) {
      return 'Are you sure you want to delete this stream?';
    }
  
    return `Are you sure you want to delete stream ${stream.title}?`;
  }

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => router.push('/')}
    />
  );
}

export default StreamDelete;
