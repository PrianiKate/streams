import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_STREAM_BY_ID_QUERY } from '../../apis/graghQL';

const StreamLoadById = ({ Component }) => {
  const router = useRouter();
  const id = router.query.id;
  const { data, loading, error } = useQuery(GET_STREAM_BY_ID_QUERY, {
    variables: { id }
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <Component {...data.Stream} />
  );
}

export default StreamLoadById;
