import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { correctAnswers } = this.props;

    const limitCorrectionQuestion = 3;

    const messageOfMinusThree = 'Could be better...';

    const messageMoreThanThree = 'Well Done!';

    return (
      <main>
        <section>
          <h1>
            { correctAnswers < limitCorrectionQuestion
              ? messageOfMinusThree : messageMoreThanThree }
          </h1>
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({ user }) => ({ ...user });

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
};
