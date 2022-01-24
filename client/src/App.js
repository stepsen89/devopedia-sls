import React, { Component } from "react";
import { Link, Route, Router, Switch } from "react-router-dom";

import Auth from "./auth/Auth";
import Login from "./components/Login";
import EntryFormPage from "./pages/EntryFormPage";
import HomePage from "./pages/HomePage";

export interface AppProps {
  auth: Auth;
  history: any;
}

export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin() {
    this.props.auth.login();
  }

  handleLogout() {
    this.props.auth.logout();
  }

  render() {
    return (
      <div className='mx-auto bg-yellow'>
        <Router history={this.props.history}>
          {this.generateMenu()}

          {this.generateCurrentPage()}
        </Router>
      </div>
    );
  }

  generateMenu() {
    console.log(this.props);
    return (
      <div className='flex justify-end p-6 md:justify-end md:space-x-10'>
        <div>{this.authButton()}</div>
      </div>
    );
  }

  authButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <button
          name='logout'
          onClick={this.handleLogout}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Log Out
        </button>
      );
    } else {
      return (
        <button
          name='login'
          onClick={this.handleLogin}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Log In
        </button>
      );
    }
  }

  generateCurrentPage() {
    if (!this.props.auth.isAuthenticated()) {
      return <Login auth={this.props.auth} />;
    }

    return (
      <Switch>
        <Route
          path='/'
          exact
          render={(props) => {
            return <HomePage {...props} auth={this.props.auth} />;
          }}
        />

        <Route
          path='/entries/:entryId/edit'
          exact
          render={(props) => {
            return <EntryFormPage {...props} auth={this.props.auth} />;
          }}
        />

        <Route
          path='/entries/new'
          exact
          render={(props) => {
            return <EntryFormPage {...props} auth={this.props.auth} />;
          }}
        />
      </Switch>
    );
  }
}
