import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import appstore from "./utils/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={appstore}>
      <App />
    </Provider>
  </>
);
