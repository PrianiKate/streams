import { SIGN_IN, SIGN_OUT } from "../actions/types";

const getInitialState = () => ({
  isSignedIn: !!localStorage.getItem('auth'),
  userId: localStorage.getItem('auth') ?? null
});

const authReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

export default authReducer;