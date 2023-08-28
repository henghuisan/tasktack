import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "./app/store/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
