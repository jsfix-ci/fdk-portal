import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField  = ({ input, label, type, meta: { touched, error, warning }, showLabel }) => (
  <div className="pl-2">
    <label className="fdk-form-label w-100" htmlFor={input.name}>
      {showLabel ? label : null}
      <textarea rows="5" {...input} type={type} className="form-control" />
    </label>
    {touched && ((error &&
      <div className="alert alert-danger mt-3">{error}</div>) || (warning && <div className="alert alert-warning mt-3">{warning}</div>))
    }
  </div>
)

TextAreaField.defaultProps = {
  showLabel: false
};

TextAreaField.propTypes = {
  showLabel: PropTypes.bool
};

export default TextAreaField;
