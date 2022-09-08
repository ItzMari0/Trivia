import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SettingButton from './SettingButton';

class Header extends Component {
  render() {
    const { history } = this.props;
    return (
      <header>
        <SettingButton history={ history } />
      </header>
    );
  }
}

export default Header;

Header.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
