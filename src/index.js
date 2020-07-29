import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "App";
import GlobalStyles from "ui/styles/GlobalStyles";
import { store, persistor } from "store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles/>
        <App/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
