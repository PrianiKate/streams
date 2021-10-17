import React from 'react';
import StreamDelete from '../../../components/streams/StreamDelete';
import Container from '../../../components/Container';
import StreamLoadById from '../../../components/streams/StreamLoadById';

const StreamDeletePage = () => (
  <Container>
    <StreamLoadById Component={StreamDelete} />
  </Container>
);

export default StreamDeletePage;
