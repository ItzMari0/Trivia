import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SettingButton from './SettingButton';

class Header extends Component {
  render() {
    const { history, avatar, name, score } = this.props;
    return (
      <header>
        <img src={ avatar } alt="foto do jogador" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
        <SettingButton history={ history } />
      </header>
    );
  }
}

const mapStateToProps = ({ user }) => ({ ...user });

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
