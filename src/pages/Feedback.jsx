import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score, history } = this.props;
    const limitCorrectionQuestion = 3;

    return (
      <main>
        <Header history={ history } />
        <section>
          <h1 data-testid="feedback-text">
            {
              (assertions < limitCorrectionQuestion)
                ? 'Could be better...' : 'Well Done!'
            }
          </h1>
        </section>
        <p>
          { 'Você acertou ' }
          <span data-testid="feedback-total-question">{ assertions }</span>
          { ' questões!' }
        </p>
        <p>
          { 'Um total de ' }
          <span data-testid="feedback-total-score">{ score }</span>
          { ' pontos' }
        </p>
        <section>
          <button
            type="submit"
            onClick={ () => history.push('/ranking') }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
          <button
            type="submit"
            onClick={ () => history.push('/') }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({ player }) => ({ ...player });

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
