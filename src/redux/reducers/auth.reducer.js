import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../actionType";

const InitialState = {
  accessToken: sessionStorage.getItem("access-token")
    ? sessionStorage.getItem("access-token")
    : null,
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null,
  loading: false,
  error: null,
};

export const authReducer = (prevState = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...prevState,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...prevState,
        loading: false,
        accessToken: payload,
      };

    case LOGIN_FAIL:
      return {
        ...prevState,
        loading: false,
        acessToken: null,
        error: payload,
      };

    case LOAD_PROFILE:
      return {
        ...prevState,
        user: payload,
      };

    case LOG_OUT:
      return {
        ...prevState,
        accessToken: null,
        user: null,
      };

    default:
      return prevState;
  }
};
