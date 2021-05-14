import React from 'react';

import './sign-in.styles.css';

import FormInput from '../form-input/form-input.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import GoogleButton from '../google-auth-button/google-auth-button.component'
import ErrorNotification from '../error-notification/error-notification.component';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors:[]
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.clearErrors();
        const { email,password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email:'',password:''});
        } catch (error) {
            switch(error.code) {
                case "auth/wrong-password":
                    this.addError("The email and password combination is incorrect, Please try again.");
                    break;
                case "auth/user-not-found":
                    this.addError("User does not exist. Please sign up first.");
                    break;
                default:
               this.addError("an unexpected error occured, Please try again");
            }
        }
    }

    addError(errorMessage) {
        this.setState( (prevState) => {
            const newErrors = [...prevState.errors];
            newErrors.push(errorMessage);
            return {
                ...prevState,
                errors:newErrors
            }
        })
    }

    clearErrors() {
        this.setState({
            ...this.state,
            errors:[]
        })
    }

    handleChange = e => {
        const { value,name } = e.target;
        this.setState({[name]:value})
    }

    render() {
        return (
            <div className="sign-in">
                <h1>Sign-in</h1>
                <ErrorNotification errors={this.state.errors}/>
                <form onSubmit={this.handleSubmit}>
                     <FormInput name="email" type="email" value={this.state.email} label="Email" handleChange={this.handleChange} required/>
                     <FormInput name="password" type="password" value={this.state.password} label="Password" handleChange={this.handleChange} required/>
                     <div className="auth-button-options">
                        <button type="submit">Sign-in</button>
                        <span className="or-option"><div/><span>OR</span><div/></span>
                        <GoogleButton signInWithGoogle={signInWithGoogle} authType="Sign in"/>
                     </div>
                     
                </form>
            </div>
        )
    }
}

export default SignIn;