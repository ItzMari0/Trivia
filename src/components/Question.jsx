import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';

const NUMBER = 0.5;
const ONE_SECOND = 1000;

class Question extends Component {
  state = {
    timer: 30,
    answers: [],
    isDisabled: false,
  };

  componentDidMount() {
    this.setState({ answers: this.randomizeAnswers() }, () => {
      this.answerTimer = setInterval(this.answerTimerSettings, ONE_SECOND);
    });
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) this.timeOut();
  }

  answerTimerSettings = () => {
    this.setState((prevState) => ({ timer: prevState.timer - 1 }));
  };

  timeOut = () => {
    const { isDisabled } = this.state;
    clearInterval(this.answerTimer);
    if (!isDisabled) {
      this.setState({
        isDisabled: true,
      });
    }
  };

  randomizeAnswers = () => {
    const { questionObj } = this.props;
    const correctAnswer = { answer: questionObj.correct_answer, isCorret: true };
    const wrongAnswers = questionObj.incorrect_answers.map((answer) => ({
      answer,
      isCorret: false,
    }));
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
          { answers.map((answer, index) => (
            <Answer
              key={ `answer-${index}` }
              isDisabled={ isDisabled }
              info={ answer }
            />
          )) }
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
