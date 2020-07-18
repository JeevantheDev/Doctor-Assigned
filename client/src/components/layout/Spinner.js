import React, { Fragment } from 'react';

export default () => (
  <Fragment>
    <div className="d-flex justify-content-center m-5">
      <div style={{
          width: "3rem",
          height: "3rem",
          marginTop: "15rem"
        }} 
        className="spinner-border text-info" 
        role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </Fragment>
);