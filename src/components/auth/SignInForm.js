import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class SignInForm extends Component {
    static propTypes = {

    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>                
                <h2>Sign in</h2>
                <form onSubmit = {handleSubmit}>
                    <div>
                        <label>Email</label>
                        <Field name='email' component='input' />
                    </div>
                    <div>
                        <label>Password</label>
                        <Field name='password' component='input' type='password' />
                    </div>
                    <div>
                        <input type='submit' />
                    </div>
                </form>
            </div>
        )
    }
}

const createReduxForm = reduxForm({ form: 'auth' });

export default createReduxForm(SignInForm)
