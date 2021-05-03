import React from 'react';

import './sign-in.styles.css';

import FormInput from '../form-input/form-input.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';


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

        const { email,password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email:'',password:''});
        } catch (error) {
            console.log(error);
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
                     <span>Or</span>
                     <button onClick={signInWithGoogle}>Sign-in with Google</button>
                </form>
            </div>
        )
    }
}

export default SignIn;