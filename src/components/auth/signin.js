import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit = values => {
    console.log("form sign in values: ", values);
    // Need to do something to log user in
    this.props.signinUser({ email: values.email, password: values.password })
  }

  renderInput(field) {
    return (
      <div>
        <label>{field.labelName}</label>
        <input {...field.input} type={field.type} className="form-control" />
      </div>
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <Field
            name="email"                     // Specify field name
            component={this.renderInput}     // Specify render above
            labelName="Email:"/>
        </fieldset>
        <fieldset className="form-group">
          <Field
            name="password"
            component={this.renderInput}
            labelName="Password:"
            type="password"/>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin'
})(
  connect(mapStateToProps, actions)(Signin)
);
