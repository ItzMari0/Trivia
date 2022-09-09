import React, { Component } from 'react';
import PropTypes from 'prop-types';

const NUMBER = 0.5;

class Question extends Component {
  randomizeAnswers = () => {
    const { questionObj } = this.props;
    const correctAnswer = (
      <button
        type="button"
        data-testid="correct-answer"
        key="correct"
      >
        { questionObj.correct_answer }
      </button>);
    const wrongAnswers = questionObj.incorrect_answers.map((answer, index) => (
      <button
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={ index }
      >
        { answer }
      </button>
    ));
    const answers = [...wrongAnswers, correctAnswer];
    const answersMixer = answers.sort(() => Math.random() - NUMBER);
    return answersMixer;
  };

  render() {
    const { questionObj } = this.props;
    return (
      <>
        <h1 data-testid="question-category">{questionObj.category}</h1>
        <h2 data-testid="question-text">{questionObj.question}</h2>
        <div data-testid="answer-options">
          {this.randomizeAnswers()}
        </div>
      </>
    );
  }
}

export default Question;

Question.propTypes = {
  questionObj: PropTypes.shape({
    question: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
