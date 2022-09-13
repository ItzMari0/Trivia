import React, { Component } from 'react';
import backgorundImage from '../images/backgroundImage.png';

class Background extends Component {
  render() {
    return (
      <div className="background-container">
        <div className="background-gradient" />
        <img src={ backgorundImage } alt="" className="backgorund-image" />
      </div>
    );
  }
}

export default Background;
