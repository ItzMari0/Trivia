import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header history={ history } />
        <main>
          <p>OI</p>
        </main>
      </>
    );
  }
}

export default Game;

Game.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
