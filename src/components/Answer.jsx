import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answer extends Component {
  state = {
    answerClass: 'answer-button',
    answered: false,
  };

  componentDidUpdate() {
    const { isDisabled, info } = this.props;
    const { answered } = this.state;
    if (isDisabled && !answered) {
      this.setState({
        answerClass: (info.isCorrect) ? 'answer-button correct' : 'answer-button wrong',
        answered: true,
      });
    } else if (!isDisabled && answered) {
      this.setState({
        answerClass: 'answer-button',
        answered: false,
      });
    }
  }

  render() {
    const { isDisabled, info, handleAnswer } = this.props;
    const { answerClass } = this.state;
    return (
      <button
        type="button"
        disabled={ isDisabled }
        data-testid={ (info.isCorrect) ? 'correct-answer' : 'wrong-answer' }
        onClick={ () => handleAnswer(info.isCorrect) }
        className={ answerClass }
      >
        { info.answer }
      </button>
    );
  }
}

Answer.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  info: PropTypes.shape({
    answer: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
  }).isRequired,
  handleAnswer: PropTypes.func.isRequired,
};

export default Answer;
