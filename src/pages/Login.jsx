import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchTriviaToken from '../services/fetchTrivia';
import { newLogin, getUserInfo } from '../redux/actions/actions';
import styles from './Login.module.css';
import trybeIcon from '../images/icone_trybe.svg';
import TriviaLogo from '../components/TriviaLogo';
import Background from '../components/Background';
import yellow from '../images/yellow.svg';
import green from '../images/green.svg';
import red from '../images/red.svg';
import blue from '../images/blue.svg';

class Login extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    isDisabled: true,
  };

  inputChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      const { inputName, inputEmail } = this.state;
      const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (inputName.length > 0 && EMAIL.test(inputEmail)) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  };

  clickButton = async (event) => {
    const { dispatch } = this.props;
    const { inputName: name, inputEmail: email } = this.state;
    event.preventDefault();
    dispatch(newLogin());
    dispatch(getUserInfo({ name, email }));
    await fetchTriviaToken();
    const { history } = this.props;
    history.push('/game');
  };

  render() {
    const { inputName, inputEmail, isDisabled } = this.state;
    const { history } = this.props;
    return (
      <main className={ styles.container }>
        <TriviaLogo />
        <form className={ styles.form }>
          <input
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.inputChange }
            name="inputEmail"
            value={ inputEmail }
            placeholder="Qual é o seu e-mail do gravatar?"
            className={ styles.input }
          />
          <input
            type="text"
            data-testid="input-player-name"
            onChange={ this.inputChange }
            name="inputName"
            value={ inputName }
            placeholder="Qual é o seu nome?"
            className={ styles.input }
          />
          <div className={ styles.buttonsContainer }>
            <button
              type="submit"
              data-testid="btn-play"
              onClick={ this.clickButton }
              disabled={ isDisabled }
              className={ styles.playButton }
            >
              JOGAR
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => history.push('/settings') }
              className={ styles.settingsButton }
            >
              <i className="fa-solid fa-gear" />
            </button>
          </div>
        </form>
        <img src={ trybeIcon } alt="trybe icon" className={ styles.trybeIcon } />
        <img src={ yellow } alt="" className={ styles.yellowDecoration } />
        <img src={ green } alt="" className={ styles.greenDecoration } />
        <img src={ red } alt="" className={ styles.redDecoration } />
        <img src={ blue } alt="" className={ styles.blueDecoration } />
        <Background />
      </main>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
