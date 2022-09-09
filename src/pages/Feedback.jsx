import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { avatar, correctAnswers, score } = this.props;
    return (
      <main>
        <img src={ avatar } alt="foto do avatar" />
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
      </main>
    );
  }
}

const mapStateToProps = ({ user }) => ({ ...user });

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  avatar: PropTypes.string.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
