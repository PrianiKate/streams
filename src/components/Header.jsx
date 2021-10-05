import React from 'react';
import Link from 'next/link';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link href="/">
        <a className="item">Streamer</a>
      </Link>
      <div className="right menu">
        <Link href="/">
          <a className="item">All streams</a>
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;