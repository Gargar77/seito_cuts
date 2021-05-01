import React from 'react';

import './sign-up.styles.css';

import FormInput from '../form-input/form-input.component';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            first:'',
            last:'',
            email:'',
            password:'',
            confirmPassword: ''
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        console.log('signed up!')
    }

    handleChange = event => {
        const { name,value } = event.target;

        this.setState({[name]:value});
    }

    render() {
        const {first,last,email,password,confirmPassword} = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">Sign-up</h2>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                    type="text"
                    name="first"
                    value={first}
                    onChange={this.handleChange}
                    label="First Name"
                    required
                    />
                    <FormInput
                    type="text"
                    name="last"
                    value={last}
                    onChange={this.handleChange}
                    label="Last Name"
                    required
                    />
                     <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    label="Email"
                    required
                    />
                     <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    label="Password"
                    required
                    />
                     <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label="Confirm Password"
                    required
                    />
                    <button type="submit">SIGN UP</button>
                </form>
            </div>
        )
    }
}

export default SignUp;