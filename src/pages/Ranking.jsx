import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  render() {
    const { history } = this.props;

    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="submit"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Tela inicial
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
