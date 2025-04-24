import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

Amplify.configure({
  Auth: {
    Cognito: {
      region: process.env.REACT_APP_AWS_REGION,
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      userPoolClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
      loginWith: {
        username: true, // Enable username/password login
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
