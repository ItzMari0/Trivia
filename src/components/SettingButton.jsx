import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SettingButton extends Component {
  buttonClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ this.buttonClick }
      >
        Settings
      </button>
    );
  }
}

export default SettingButton;

SettingButton.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
