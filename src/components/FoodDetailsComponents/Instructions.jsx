import React from 'react';
import PropTypes from 'prop-types';

const Instructions = ({ instructions }) => (
  <div>
    <h4>Instruções:</h4>
    <article data-testid="instructions">{instructions}</article>
  </div>
);

export default Instructions;

Instructions.propTypes = {
  instructions: PropTypes.string.isRequired,
};
