import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonPlayAgain from '../components/ButtonPlayAgain';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { correctAnswers, score, history } = this.props;
    const limitCorrectionQuestion = 3;

    return (
      <main>
        <Header history={ history } />
        <section>
          <h1 data-testid="feedback-text">
            {
              (correctAnswers < limitCorrectionQuestion)
                ? 'Could be better...' : 'Well Done!'
            }
          </h1>
        </section>
        <p>
          { 'Você acertou ' }
          <span data-testid="feedback-total-question">{ correctAnswers }</span>
          { ' questões!' }
        </p>
        <p>
          { 'Um total de ' }
          <span data-testid="feedback-total-score">{ score }</span>
          { ' pontos' }
        </p>
        <section>
          <ButtonPlayAgain />
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({ player }) => ({ ...player });

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  correctAnswers: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
