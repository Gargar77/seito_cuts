import React from 'react';

import './sign-up.styles.css';

import FormInput from '../form-input/form-input.component';
import { auth,createUserProfileDocument } from '../../firebase/firebase.utils';


class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            first:'',
            last:'',
            email:'',
            password:'',
            confirmPassword: '',
            errors:[]
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const {first,last,email,password} = this.state;

        this.validate();
        
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email,password);

            await createUserProfileDocument(user,{first,last});
            this.setState({
                first:'',
                last:'',
                email:'',
                password:'',
                confirmPassword:'',
                errors:[]
            })

        } catch (error) {
            this.addError("an unexpected error occured, please try again");
            console.log(error);
        }

    }

    validate() {
        const {password,confirmPassword} = this.state;
        // if passwords match
        this.confirmPasswords(password,confirmPassword);
        setTimeout(() => {
            this.clearErrors();
        }, 5000);
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
        console.log('painting sign-up Component')
        console.log(this.state)
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