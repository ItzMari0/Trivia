import React, { Component } from 'react';
import PropTypes from 'prop-types';

const NUMBER = 0.5;
const ONE_SECOND = 1000;

class Question extends Component {
  state = {
    timer: 30,
    answers: [],
    answerTimer: null,
    isDisabled: false,
  };

  componentDidMount() {
    this.setState({ answers: this.randomizeAnswers() }, () => {
      const answerTimer = setInterval(this.answerTimer, ONE_SECOND);
      this.setState({ answerTimer });
    });
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) this.timeOut();
  }

  answerTimer = () => {
    this.setState((prevState) => ({ timer: prevState.timer - 1 }));
  };

  timeOut = () => {
    const { answerTimer, isDisabled } = this.state;
    clearInterval(answerTimer);
    if (!isDisabled) {
      this.setState((prevState) => ({
        answers: prevState.answers
          .map((answer) => ({ ...answer, props: { ...answer.props, disabled: true } })),
        isDisabled: true,
      }));
    }
  };

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
    const { timer, answers, isDisabled } = this.state;
    return (
      <>
        <section>
          <h1 data-testid="question-category">{questionObj.category}</h1>
          <h2 data-testid="question-text">{questionObj.question}</h2>
          <p>
            { 'Tempo: ' }
            <span>{ timer }</span>
            s
          </p>
        </section>
        <div data-testid="answer-options">
          { answers }
        </div>
        { isDisabled && <button type="button">Next</button> }
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
