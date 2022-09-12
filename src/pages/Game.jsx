import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions/actions';
import Question from '../components/Question';

const QUESTION_LIMIT = 4;

class Game extends Component {
  state = {
    currentQuestion: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    dispatch(fetchQuestions(token));
  }

  componentDidUpdate() {
    const { history, isInvalid } = this.props;
    if (isInvalid) {
      localStorage.clear();
      history.push('/');
    }
  }

  questionElement = () => {
    const { currentQuestion } = this.state;
    const { questions } = this.props;
    const questionObj = questions[currentQuestion];
    return (<Question questionObj={ questionObj } nextQuestion={ this.nextBtnClick } />);
  };

  nextBtnClick = () => {
    const { history, name, avatar, score } = this.props;
    const { currentQuestion } = this.state;
    if (currentQuestion < QUESTION_LIMIT) {
      this.setState((previousState) => ({
        currentQuestion: previousState.currentQuestion + 1,
      }));
    } else {
      const lastRanking = JSON.parse(localStorage.getItem('ranking'));
      const newRanking = (lastRanking)
        ? [...lastRanking, { name, avatar, score }] : [{ name, avatar, score }];
      const ranking = JSON.stringify(newRanking);
      localStorage.setItem('ranking', ranking);
      history.push('/feedback');
    }
  };

  render() {
    const { history, questions } = this.props;
    return (
      <>
        <Header history={ history } />
        <main>
          <h1>TRIVIA</h1>
          {(questions.length > QUESTION_LIMIT)
            ? this.questionElement()
            : <p>carregando</p> }
        </main>
      </>
    );
  }
}

const mapStateToProps = ({ questionsReducer, player }) => ({
  questions: questionsReducer.questions,
  isInvalid: questionsReducer.isInvalid,
  ...player,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  isInvalid: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
