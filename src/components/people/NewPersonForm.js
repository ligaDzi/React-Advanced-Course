import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import emailValidator from 'email-validator'
import { connect } from 'react-redux'

import { moduleName, addPerson } from '../../ducks/people'

import ErrorField from '../common/ErrorField'

class NewPersonForm extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <Field name='firstName' component={ErrorField} />
                    <Field name='lastName' component={ErrorField} />
                    <Field name='email' component={ErrorField} />
                    <div>
                        <input type='submit' />
                    </div>
                </form>
                
            </div>
        )
    }
}

const validate = ({ firstName, email }) => {
    const errors = {}

    if(!firstName) errors.firstName = 'first name is required';

    if(!email) errors.email = 'email is required';
    else if(!emailValidator.validate(email)) errors.email = 'invalid email';

    return errors;
}

const createReduxForm = reduxForm({ 
    form: 'people', 
    validate: validate
});


export default createReduxForm(NewPersonForm)
