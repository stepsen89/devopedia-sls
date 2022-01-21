import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { withRouter } from "react-router-dom";

import { authConfig } from "../config";
import { configure } from "@testing-library/react";

class AuthProvider extends React.Component {
  domain = authConfig.domain;
  clientId = authConfig.clientId;

  onRedirectCallback = (appState) => {
    this.props.history.push(appState?.returnTo || window.location.pathname);
  };

  render() {
    return (
      <Auth0Provider
        domain={this.domain}
        clientId={this.clientId}
        redirectUri={authConfig.callbackUrl}
        onRedirectCallback={this.onRedirectCallback}
      >
        {this.props.children}
      </Auth0Provider>
    );
  }
}

export default withRouter(AuthProvider);
