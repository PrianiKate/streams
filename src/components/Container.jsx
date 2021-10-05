import React from 'react';
import Head from 'next/head';
import Header from './Header';

const Container = ({ children }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />
      <script src="https://apis.google.com/js/api.js"></script>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
      />
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <title>Streamer</title>
    </Head>
    <Header />
    <div className="ui container">
      {children}
    </div>
  </div>
);

export default Container;
