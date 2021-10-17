import React from 'react';
import StreamShow from '../../components/streams/StreamShow';
import Container from '../../components/Container';
import StreamLoadById from '../../components/streams/StreamLoadById';

const StreamShowPage = () => (
  <Container>
    <StreamLoadById Component={StreamShow} />
  </Container>
);

export default StreamShowPage;
