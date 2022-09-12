import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answer extends Component {
  render() {
    const { isDisabled, info } = this.props;
    return (
      <button
        type="button"
        disabled={ isDisabled }
        data-testid={ (info.isCorret) ? 'correct-answer' : 'wrong-answer' }
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
    isCorret: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Answer;
