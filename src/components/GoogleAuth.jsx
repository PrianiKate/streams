import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../actions';

const GoogleAuth = () => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const dispatch = useDispatch();
  const auth = useRef();

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      dispatch(signIn(auth.current.currentUser.get().getId()));
    } else {
      dispatch(signOut());
    }
  };

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '208935650712-s47b2nsrfmvoqqi3t4133co4uj2bff1e.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        auth.current = window.gapi.auth2.getAuthInstance();
        onAuthChange(auth.current.isSignedIn.get());
        auth.current.isSignedIn.listen(onAuthChange);
      });
    });
  });

  const onSignInClick = () => {
    auth.current.signIn();
  }

  const onSignOutClick = () => {
    auth.current.signOut();
  }

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button 
          onClick={onSignOutClick} 
          className="ui red google button"
        >
          <i className="google icon"></i>
          Sign out
        </button>
      );
    }
    return (
      <button 
        onClick={onSignInClick}
        className="ui red google button"
      >
        <i className="google icon"></i>
        Sign in
      </button>
    );
  }

  return (
    <div>{renderAuthButton()}</div>
  );
}

export default GoogleAuth;