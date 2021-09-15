import React from 'react';
import { connect } from 'react-redux';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { signInUser, signOutUser } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    this.auth = getAuth();
    this.provider = new GoogleAuthProvider();
  }

  onSignInClick = () => {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        const userId = result.user.providerData[0].uid;
        this.props.signInUser(userId);
      });
  }

  onSignOutClick = () => {
    signOut(this.auth)
      .then(() => {
        this.props.signOutUser();
      });
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button 
          onClick={this.onSignOutClick} 
          className="ui red google button"
        >
          <i className="google icon"></i>
          Sign out
        </button>
      );
    }
    return (
      <button 
        onClick={this.onSignInClick} 
        className="ui red google button"
      >
        <i className="google icon"></i>
        Sign in
      </button>
    );
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signInUser, signOutUser })(GoogleAuth);