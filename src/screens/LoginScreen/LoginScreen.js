import React, { useEffect } from "react";
import "./_login.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/actions/auth.action";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleLogin = () => {
    dispatch(login());
  };

  useEffect(() => {
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);
  return (
    <div className="login">
      <div className="login__container">
        <h2>Youtube Clone</h2>
        <img
          height="10px"
          src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt=""
        />
        <button
          onClick={() => {
            handleLogin();
          }}
        >
          Login With google
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
