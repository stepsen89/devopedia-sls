import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

class AuthNav extends React.Component {
  render() {
    const { isAuthenticated, loginWithRedirect, logout } = this.props.auth0;

    return (
      <div>
        {!isAuthenticated ? (
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
        ) : (
          <button
            className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
            onClick={() =>
              logout({
                returnTo: window.location.origin,
              })
            }
          >
            Log Out
          </button>
        )}
      </div>
    );
  }
}

export default withAuth0(AuthNav);
