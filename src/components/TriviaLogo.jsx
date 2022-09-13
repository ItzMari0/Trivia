import React, { Component } from 'react';
import yellow from '../images/yellow.svg';
import green from '../images/green.svg';
import red from '../images/red.svg';

class TriviaLogo extends Component {
  render() {
    return (
      <div className="triviaLogo">
        <div className="triviaCircle">
          <div className="triviaImages">
            <img src={ yellow } alt="" />
            <img src={ green } alt="" className="triviaGreen" />
            <img src={ red } alt="" />
          </div>
          <span className="triviaText">TRIVIA</span>
        </div>
        <div className="triviaTriangle" />
      </div>
    );
  }
}

export default TriviaLogo;
