import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../actions';

const GoogleAuth = () => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '208935650712-s47b2nsrfmvoqqi3t4133co4uj2bff1e.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        GoogleAuth.auth = window.gapi.auth2.getAuthInstance();
        onAuthChange(GoogleAuth.auth.isSignedIn.get());
        GoogleAuth.auth.isSignedIn.listen(onAuthChange);
      });
    });
  });

  const onAuthChange = isSignedIn => {
    if (isSignedIn) {
      dispatch(signIn(GoogleAuth.auth.currentUser.get().getId()));
    } else {
      dispatch(signOut());
    }
  }

  const onSignInClick = () => {
    GoogleAuth.auth.signIn();
  }

  const onSignOutClick = () => {
    GoogleAuth.auth.signOut();
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