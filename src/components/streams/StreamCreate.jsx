import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useReactiveVar } from '@apollo/client';
import StreamForm from './StreamForm';
import { authVar } from '../../apolloClient';
import { CREATE_STREAM_MUTATION, GET_STREAMS_QUERY } from '../../apis/graghQL';

const StreamCreate = () => {
  const [createStream] = useMutation(CREATE_STREAM_MUTATION, {
    refetchQueries: [
      { query: GET_STREAMS_QUERY }
    ]
  });
  const router = useRouter();
  const { userId } = useReactiveVar(authVar);

  const onSubmit = (formProps) => {
    createStream({ variables: { ...formProps, userId } })
      .then(() => {
        router.push('/');
      });
  }

  return (
    <div>
      <h3>Create a Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
}

export default StreamCreate;