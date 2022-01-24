import React, { Fragment } from "react";

// import { Hero } from "../components";

class MainPage extends React.Component {
  render() {
    return (
      <Fragment>
        <div className='container flex flex-row pt-3  h-5/6  justify-center items-center'>
          <div className='w-2/4 p-8'>
            <h3 className='font-bold text-3xl pb-3'> Devopedia </h3>
            <p>
              {" "}
              Suspendisse condimentum egestas nisl, at sodales neque ornare sed.
              Donec ex metus, imperdiet eu eros a, varius semper tellus. Morbi
              placerat, ante et tempus auctor, sapien sapien auctor est, vel
              aliquam augue risus non risus{" "}
            </p>
          </div>
          <img
            alt='Undraw illustration'
            src='assets/undraw_Know.png'
            width='500px'
            className='h-2/3'
          />
        </div>

        {/* <Hero />
        
        <hr />
        <HomeContent /> */}
      </Fragment>
    );
  }
}

export default MainPage;
