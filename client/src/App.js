import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Loader from "./components/Loader";
import { withAuth0 } from "@auth0/auth0-react";
// import ProtectedRoute from "./auth/protected-route";

class App extends React.Component {
  render() {
    const { isLoading } = this.props.auth0;
    console.log(this.props);

    // if (isLoading) {
    //   return <Loader />;
    // }

    return (
      <div id='app' className='container mx-auto bg-yellow-200'>
        <Header />
        <div>
          <div className='mt-5'>
            <Switch>
              <Route path='/' exact component={MainPage} />
              {/* <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/external-api" component={ExternalApi} /> */}
            </Switch>
          </div>
        </div>
        {/* <Footer /> */}
        <h3> here comes the footer</h3>
      </div>
    );
  }
}

export default withAuth0(App);
