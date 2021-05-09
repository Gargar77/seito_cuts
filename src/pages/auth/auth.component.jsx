import React from 'react';
import './auth.styles.css';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import {ReactComponent as MainLogo} from '../../assets/seito_astro.svg';
import {ReactComponent as CutLogo} from '../../assets/seito_cut.svg';

class Auth extends React.Component {
    state = {
        isSignIn:false,
        isLanding:true
    }

    startSignInHandler = () => {
        this.setState({
            isSignIn:true,
            isLanding:false
        })
    }

    startSignUpHandler = () => {
        this.setState({isLanding:false})
    }

    returnHomeHandler = () => {
        this.setState({
            isSignIn:false,
            isLanding:true
        })
    }

    render() {
        
        let auth = (
            <div className="landing">
                <div className="auth-background"></div>
                <div className="svg-container">
                    <div className="main-logo">
                        <MainLogo/>
                    </div>
                    <div className="cut-logo">
                        <CutLogo/>
                    </div>
                </div>
               
                <div className="auth-actions">
                    <button onClick={this.startSignUpHandler}>Sign up</button>
                    <p>Already have an account? <span onClick={this.startSignInHandler} className="landing-signin">Sign in</span></p>
                </div>
            </div> 
        )

        const {isSignIn,isLanding} = this.state;
        if (isSignIn && !isLanding) {
            auth = (
                <div>
                    <button onClick={this.returnHomeHandler}>back</button>
                    <SignIn/>
                </div>
            )
        } else if (!isLanding) {
            auth = (
                <div>
                    <button onClick={this.returnHomeHandler}>back</button>
                    <SignUp/>
                </div>
            )
        }

        return (
            <div className="auth">
                {auth}
            </div>
        )
    }
} 

export default Auth;