import firebase from "firebase/app";

import auth from "../../config/firebase";

import {
  LOAD_PROFILE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOG_OUT,
} from "../actionType";

export const login = () => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
  const res = await auth.signInWithPopup(provider);
  const accessToken = res.credential.accessToken;

  const profile = {
    name: res.additionalUserInfo.profile.name,
    photoUrl: res.additionalUserInfo.profile.picture,
  };

  sessionStorage.setItem("access-token", accessToken);
  sessionStorage.setItem("user", JSON.stringify(profile));

  dispatch({
    type: LOGIN_SUCCESS,
    payload: accessToken,
  });

  dispatch({
    type: LOAD_PROFILE,
    payload: profile,
  });
};

export const logOut = () => async (dispatch) => {
  await auth.signOut();
  dispatch({
    type: LOG_OUT,
  });
  sessionStorage.removeItem("access-token");

  sessionStorage.removeItem("profile");
};
