import auth0 from "auth0-js";
import { authConfig } from "../config";

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: authConfig.domain,
    clientID: authConfig.clientId,
    redirectUri: authConfig.callbackUrl,
    responseType: "token id_token",
    scope: "openid",
  });

  constructor(history) {
    this.history = history;

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.history.replace("/");
        console.error(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    localStorage.setItem("isLoggedIn", "true");

    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    this.history.replace("/");
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.error(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  }

  logout() {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    localStorage.removeItem("isLoggedIn");

    this.auth0.logout({
      return_to: window.location.origin,
    });

    this.history.replace("/");
  }

  isAuthenticated() {
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}
