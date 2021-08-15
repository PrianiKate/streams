import React from 'react';
import { Field, Form } from 'react-final-form';

const StreamForm = (props) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
 
  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  }

  const onSubmit = (formProps) => {
    props.onSubmit(formProps);
  }

  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit} 
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="ui form error">
          <Field 
            name="title" 
            component={renderInput} 
            label="Enter title" 
          />
          <Field 
            name="description" 
            component={renderInput} 
            label="Enter description" 
          />
          <button className="ui button primary">Submit</button>
        </form>
      )}
    />
  );
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
}

export default StreamForm;