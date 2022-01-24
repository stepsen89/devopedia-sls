import React, { Component } from "react";
import { Link, Route, Router, Switch } from "react-router-dom";

import Auth from "./auth/Auth";
import Login from "./components/Login";
import EntryFormPage from "./pages/EntryFormPage";
import MainPage from "./pages/MainPage";
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
      <div className='mx-auto  container h-screen'>
        <Router history={this.props.history}>
          {this.generateMenu()}

          {this.generateCurrentPage()}
        </Router>
      </div>
    );
  }

  generateMenu() {
    return (
      <div className='p-6 flex justify-end border-b-2 border-gray-400'>
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
          className='bg-white hover:bg-blue-700 text-black border-2 border-gray-500 font-bold py-2 px-4 rounded'
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
      return <MainPage />;
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
