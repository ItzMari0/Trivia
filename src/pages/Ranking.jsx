import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.rankingPlayers();
  }

  rankingPlayers = () => {
    const stringifiedRanking = localStorage.getItem('ranking');
    const ranking = JSON.parse(stringifiedRanking);
    const sortedRanking = ranking
      .sort((player, nextPlayer) => nextPlayer.score - player.score);
    this.setState({ ranking: sortedRanking });
  };

  render() {
    const { history } = this.props;
    const { ranking } = this.state;

    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {ranking.map((player, index) => (
            <li key={ `score-${index}` }>
              <img src={ player.avatar } alt={ player.name } />
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </li>
          ))}
        </ul>
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
