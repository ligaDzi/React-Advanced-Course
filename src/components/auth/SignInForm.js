import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import emailValidator from 'email-validator'

import ErrorField from '../common/ErrorField'

class SignInForm extends Component {
    static propTypes = {

    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>                
                <h2>Sign in</h2>
                <form onSubmit = {handleSubmit}>
                    <Field name='email' component={ErrorField} />
                    <Field name='password' component={ErrorField} type='password' />
                    <div>
                        <input type='submit' />
                    </div>
                </form>
            </div>
        )
    }
}

const validate = ({ email, password }) => {
    const errors = {}

    if(!email) errors.email = 'email is required';
    else if(!emailValidator.validate(email)) errors.email = 'invalid email';

    if(!password) errors.password = 'password is required';
    else if(password.length < 6) errors.password = 'to short';

    return errors;
}

const createReduxForm = reduxForm({ form: 'auth', validate: validate });

export default createReduxForm(SignInForm)
