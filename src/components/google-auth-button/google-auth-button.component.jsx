import React from 'react';

import './google-auth-button.styles.css';
import {ReactComponent as GoogleLogo} from '../../assets/google_icon.svg';


const GoogleAuthButton = ({signInWithGoogle,authType}) => (
    <button 
        className="google-auth-button" 
        onClick={signInWithGoogle}>
            <div className="google-logo" >
                <GoogleLogo/>
            </div>
            <span>{`${authType} with Google`}</span>
    </button>
);

export default GoogleAuthButton;