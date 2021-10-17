import React from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import Modal from '../Modal';
import { DELETE_STREAM_MUTATION, GET_STREAMS_QUERY } from '../../apis/graghQL';

const StreamDelete = (stream) => {
  const [deleteStream] = useMutation(DELETE_STREAM_MUTATION, {
    refetchQueries: [
      { query: GET_STREAMS_QUERY }
    ]
  });
  const router = useRouter();
  const id = router.query.id;

  const onClickDelete = () => {
    deleteStream({ variables: { id } })
      .then(() => {
        router.push('/');
      });
  };

  const renderActions = () => (
      <>
        <button 
          className="ui negative button"
          onClick={() => onClickDelete()}
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
