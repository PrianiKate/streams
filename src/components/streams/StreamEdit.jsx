import React, { useEffect } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
 
const StreamEdit = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;
  const stream = useSelector(state => state.streams[id]);
  useEffect(() => {
    dispatch(fetchStream(id));
  }, [dispatch, id]);

  const onSubmit = formValues => {
    dispatch(editStream(id, formValues));
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
