import {
  setDoc, collection, getDocs, getFirestore, deleteDoc,
  getDoc, doc, orderBy, query, serverTimestamp, updateDoc,
} from "firebase/firestore";
import { 
  CREATE_STREAM, 
  SIGN_IN, 
  SIGN_OUT,
  FETCH_STREAMS,
  FETCH_STREAM ,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";
import firebase from '../apis/firebase';
import history from '../history';

const db = getFirestore(firebase);
const streamCollection = collection(db, 'streams');

export const signInUser = (userId) => {
  localStorage.setItem('auth', userId);
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOutUser = () => {
  localStorage.removeItem('auth');
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const docRef = doc(streamCollection);
  const date = serverTimestamp();
  await setDoc(docRef, { ...formValues, userId, date });

  dispatch({ type: CREATE_STREAM, payload: {
      ...formValues,
      userId,
      id: docRef.id,
      date,
    }
  });
  history.push('/');
}

export const fetchStreams = () => async dispatch => {
  const streamsRef = query(streamCollection, orderBy('date'));
  const response = await getDocs(streamsRef);

  let streamList = [];
  response.forEach((doc) => {
    streamList.push({ id: doc.id, ...doc.data() });
  });

  dispatch({ type: FETCH_STREAMS, payload: streamList });
}

export const fetchStream = id => async dispatch => {
  const docRef = doc(db, 'streams', id);
  const response = await getDoc(docRef);

  dispatch({ type: FETCH_STREAM, payload: { id: response.id, ...response.data() } });
}

export const deleteStream = id => async dispatch => {
  const docRef = doc(db, 'streams', id);
  await deleteDoc(docRef);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
}

export const editStream = (id, formValues) => async dispatch => {
  const docRef = doc(db, 'streams', id);
  await updateDoc(docRef, { ...formValues });

  dispatch({ type: EDIT_STREAM, payload: { id,  ...formValues } });
  history.push('/');
}