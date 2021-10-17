import React from 'react';
import StreamEdit from '../../../components/streams/StreamEdit';
import Container from '../../../components/Container';
import StreamLoadById from '../../../components/streams/StreamLoadById';

const StreamEditPage = () => (
  <Container>
    <StreamLoadById Component={StreamEdit} />
  </Container>
);

export default StreamEditPage;
