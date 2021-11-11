import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// module imports
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
// css imports
import "antd/dist/antd.css";
import "./styles/index.scss";
import "./index.css";
import "react-quill/dist/quill.snow.css";
//component imports
import App from "./App";

ReactDOM.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
