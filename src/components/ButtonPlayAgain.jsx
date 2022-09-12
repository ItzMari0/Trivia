import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ButtonPlayAgain extends Component {
  state = {
    redirect: false,
  };

  inputClick = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <button
          type="button"
          onClick={ () => this.inputClick() }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      </div>
    );
  }
}

export default ButtonPlayAgain;
