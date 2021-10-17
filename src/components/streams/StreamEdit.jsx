import React from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useMutation, useReactiveVar } from '@apollo/client';
import StreamForm from './StreamForm';
import { authVar } from '../../apolloClient';
import { UPDATE_STREAM_MUTATION, GET_STREAMS_QUERY } from '../../apis/graghQL';
 
const StreamEdit = (stream) => {
  const [updateStream] = useMutation(UPDATE_STREAM_MUTATION, {
    refetchQueries: [
      { query: GET_STREAMS_QUERY }
    ]
  });

  const router = useRouter();
  const id = router.query.id;
  const { userId } = useReactiveVar(authVar);

  const onSubmit = formValues => {
    updateStream({ variables: { ...formValues, userId, id } })
      .then(() => {
        router.push('/');
      });
  };

  if (!stream) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        initialValues={_.pick(stream, 'title', 'description')} 
        onSubmit={onSubmit} 
      />
    </div>
  );
}

export default StreamEdit;
