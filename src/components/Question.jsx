import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Answer from './Answer';
import { correctAnswer } from '../redux/actions/actions';

const NUMBER = 0.5;
const ONE_SECOND = 1000;
const SCORE_DEFAULT_VALUE = 10;

class Question extends Component {
  state = {
    timer: 30,
    answers: [],
    isDisabled: false,
    difficulty: 0,
  };

  componentDidMount() {
    this.setState({ answers: this.randomizeAnswers() }, () => {
      this.answerTimer = setInterval(this.answerTimerSettings, ONE_SECOND);
    });
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) this.handleAnswer();
  }

  answerTimerSettings = () => {
    this.setState((prevState) => ({ timer: prevState.timer - 1 }));
  };

  handleAnswer = (isCorrect) => {
    const { isDisabled, timer, difficulty } = this.state;
    clearInterval(this.answerTimer);
    if (!isDisabled) {
      this.setState({
        isDisabled: true,
      });
    }
    if (isCorrect) {
      const { dispatch } = this.props;
      const score = SCORE_DEFAULT_VALUE + (timer * difficulty);
      dispatch(correctAnswer(score));
    }
  };

  randomizeAnswers = () => {
    const { questionObj } = this.props;
    if (questionObj.difficulty !== 'hard') {
      const difficulty = (questionObj.difficulty === 'easy' ? 1 : 2);
      this.setState({ difficulty });
    } else this.setState({ difficulty: 3 });
    const correct = { answer: questionObj.correct_answer, isCorret: true };
    const wrongs = questionObj.incorrect_answers.map((answer) => ({
      answer,
      isCorret: false,
    }));
    const answers = [...wrongs, correct];
    const answersMixer = answers.sort(() => Math.random() - NUMBER);
    return answersMixer;
  };

  handleNextBtn = () => {
    const { nextQuestion } = this.props;
    this.setState({ isDisabled: false, timer: 30 }, () => {
      nextQuestion();
      this.setState({ answers: this.randomizeAnswers() }, () => {
        this.answerTimer = setInterval(this.answerTimerSettings, ONE_SECOND);
      });
    });
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
              handleAnswer={ this.handleAnswer }
            />
          )) }
        </div>
        {isDisabled
          && (
            <button
              type="button"
              onClick={ this.handleNextBtn }
              data-testid="btn-next"
            >
              Next
            </button>
          )}
      </>
    );
  }
}

export default connect()(Question);

Question.propTypes = {
  questionObj: PropTypes.shape({
    question: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
