import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";

import App from "App";
import GlobalStyles from "ui/styles/GlobalStyles";
import store from "redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <>
        <GlobalStyles />

        <App className="app" />
      </>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
