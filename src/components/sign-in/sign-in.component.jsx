import React from 'react';

import './sign-in.styles.css';

import FormInput from '../form-input/form-input.component';


class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log('logged in!');
    }

    handleChange = e => {
        const { value,name } = e.target;
        this.setState({[name]:value})
    }

    render() {
        return (
            <div className="sign-in">
                <h1>Sign-in</h1>
                <form onSubmit={this.handleSubmit}>
                     <FormInput name="email" type="email" value={this.state.email} label="Email" handleChange={this.handleChange} required/>
                     <FormInput name="password" type="password" value={this.state.password} label="Password" handleChange={this.handleChange} required/>
                     <button type="submit">Sign-in</button>
                </form>
            </div>
        )
    }
}

export default SignIn;