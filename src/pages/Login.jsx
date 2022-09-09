import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchTriviaToken from '../services/fetchTrivia';
import SettingButton from '../components/SettingButton';
import { newLogin, getUserInfo } from '../redux/actions/actions';

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
      <main>
        <form action="#">
          <label htmlFor="#">
            Nome
            <input
              type="text"
              data-testid="input-player-name"
              onChange={ this.inputChange }
              name="inputName"
              value={ inputName }
            />
          </label>
          <label htmlFor="#">
            Email
            <input
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.inputChange }
              name="inputEmail"
              value={ inputEmail }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            onClick={ this.clickButton }
            disabled={ isDisabled }
          >
            Play
          </button>
          <SettingButton history={ history } />
        </form>
      </main>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
