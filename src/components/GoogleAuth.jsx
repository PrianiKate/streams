import React, { useEffect, useRef } from 'react';
import { useReactiveVar } from '@apollo/client';
import { authInitialState, authVar } from '../apolloClient';

const GoogleAuth = () => {
  const authState = useReactiveVar(authVar);
  const auth = useRef();

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '208935650712-s47b2nsrfmvoqqi3t4133co4uj2bff1e.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        auth.current = window.gapi.auth2.getAuthInstance();
      });
    });
  });

  const onSignInClick = () => {
    auth.current.signIn();
    authVar({
      isSignedIn: true,
      userId: auth.current.currentUser.get().getId()
    });
  }

  const onSignOutClick = () => {
    auth.current.signOut();
    authVar({
      ...authInitialState
    });
  }

  const renderAuthButton = () => {
    if (authState.isSignedIn) {
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