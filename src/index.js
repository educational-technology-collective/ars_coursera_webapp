import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from "@auth0/auth0-react";
import App from './App';

ReactDOM.render(
    <Auth0Provider
    domain="dev-cwlycnia1ycurc6s.us.auth0.com"
    clientId="iJNXzIeXbUXMcLecanh11sM6byC8Imgm"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
    document.getElementById('root'));
