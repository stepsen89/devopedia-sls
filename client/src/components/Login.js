import React from "react";
import Auth from "../auth/Auth";

interface LoginProps {
  auth: Auth;
}

interface LoginState {}

class Login extends React.PureComponent<LoginProps, LoginState> {
  onLogin = () => {
    this.props.auth.login();
  };

  render() {
    return (
      <div>
        <h1>Please log in</h1>

        <button onClick={this.onLogin} size='huge' color='olive'>
          Log in
        </button>
      </div>
    );
  }
}

export default Login;
