/**
*
* CustomLoading
*
*/

import React from 'react';
// import styled from 'styled-components';


class CustomLoading extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', width: '100%', height: '100%', background: '#fff', zIndex: '99999', overflow: 'hidden' }}>
        <div className="img-box-mix text-center">
          <img src="/assets/img/loader.svg" alt="loading"/>
        </div>
      </div>
    );
  }
}

CustomLoading.propTypes = {

};

export default CustomLoading;
