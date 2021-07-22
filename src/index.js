import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./_base.scss";

ReactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
