import React from 'react';

import './sign-up.styles.css';

import FormInput from '../form-input/form-input.component';
import { auth,createUserProfileDocument, signInWithGoogle } from '../../firebase/firebase.utils';
import GoogleAuthButton from '../google-auth-button/google-auth-button.component';
import ErrorNotification from '../error-notification/error-notification.component';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            first:'',
            last:'',
            email:'',
            password:'',
            confirmPassword: '',
            errors:[],
            isSigningUp:false
        }
    }

    signUp = async (provider) => {
        const {email,password} = this.state;
        this.validate();

        try {
           if (provider === 'google') {
            const {user} = await signInWithGoogle();
            let [first,middle,last=''] = user.displayName.split(' ');
            if (last === '') last = middle;
            await createUserProfileDocument(user,{first,last});
           } else {
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user,{first:this.state.first,last:this.state.last});
           }
        } catch (error) {
            switch(error.code) {
                case "auth/email-already-in-use":
                    this.addError(error.message);
                    break;
                default:
               this.addError("an unexpected error occured, please try again");
               this.setState({
                ...this.state,
                isSigningUp:false
            })
            }
        }
    }
    
    handleSubmit =  (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            isSigningUp:true
        })
        this.clearErrors();
        this.signUp('email');
    }

    validate() {
        const {password,confirmPassword} = this.state;
        // if passwords match
        this.confirmPasswords(password,confirmPassword);
    }

    confirmPasswords(password,confirmPassword) {
        if (password !== confirmPassword) {
            this.clearPasswords();
            this.addError('Passwords do not match!');
        }
    }

    clearPasswords() {
        this.setState((prevState)=> ({
            ...prevState,
            password:'',
            confirmPassword:''
        }))
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

    handleChange = event => {
        const { name,value } = event.target;

        this.setState({[name]:value});
    }

    render() {
        const {first,last,email,password,confirmPassword,errors,isSigningUp} = this.state;
        return(
            <div className="sign-up">
                <h1 className="title">Sign-up</h1>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                <div className="auth-button-options">
                        <GoogleAuthButton signInWithGoogle={signInWithGoogle} authType="Sign up"/>
                        <span className="or-option"><div/><span>OR</span><div/></span>
                </div>
                <ErrorNotification errors={errors}/>
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
                    {isSigningUp ? <p>Loading...</p> : <button type="submit">SIGN UP</button>} 
                </form>
            </div>
        )
    }
}

export default SignUp;