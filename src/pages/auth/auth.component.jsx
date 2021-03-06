import React from 'react';
import './auth.styles.css';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import {ReactComponent as MainLogo} from '../../assets/seito_astro.svg';
import {ReactComponent as CutLogo} from '../../assets/seito_cut.svg';
import {ReactComponent as BackArrow} from '../../assets/back_arrow.svg';


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

    renderBackButton(){
        return (
            <div className="back-arrow" onClick={this.returnHomeHandler}><BackArrow/></div>
        )
    }

    render() {
        
        let auth = (
            <div className="landing">
                <div className="svg-container">
                    <div className="main-logo">
                        <MainLogo/>
                    </div>
                    <div className="cut-logo">
                        <CutLogo/>
                        v1.0
                    </div>
                </div>
               
                <div className="auth-actions">
                    <button onClick={this.startSignUpHandler}>Sign up</button>
                    <p>Already have an account? <span onClick={this.startSignInHandler} className="landing-signin">Sign in</span></p>
                    <p style={{marginTop:'40px'}}className="credit">Made with ❤️ by <span onClick={()=>window.open("https://garybautista.me/",'_blank')}>Gary Bautista</span></p>
                </div>
            </div> 
        )

        const {isSignIn,isLanding} = this.state;
        if (isSignIn && !isLanding) {
            auth = (
                <div>
                    {this.renderBackButton()}
                    <SignIn/>
                </div>
            )
        } else if (!isLanding) {
            auth = (
                <div>
                    {this.renderBackButton()}
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