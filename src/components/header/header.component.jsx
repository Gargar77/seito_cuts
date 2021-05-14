import React, { useState } from 'react';
import {auth} from '../../firebase/firebase.utils';
import './header.styles.css';

import {ReactComponent as PowerIcon} from '../../assets/power_icon.svg'

const Header = ({authInfo}) => {
const [isDrawerActive,toggleDrawer] = useState(false);
return (
    <div className="main-header">
    <div onClick={()=> toggleDrawer(!isDrawerActive)} className="burger-icon">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div onClick={()=>toggleDrawer(!isDrawerActive)} className={`backdrop ${isDrawerActive ? '' : 'hidden'}`}></div>
    <div className={`drawer ${isDrawerActive ? '' : 'hidden'}`}>
      <div className="intro">
        <p>Welcome,</p>
        <p>{`${authInfo.first} ${authInfo.last}`}</p>
        <p className="intro-email">{authInfo.email}</p>
      </div>
      <div className="logout-button" onClick={()=> auth.signOut()}><div><PowerIcon/></div>Logout</div>
      <div style={{fontWeight:'bold',marginTop:'12px'}}>--More features coming soon!--</div>
    </div>
  </div>
)  
  
}

export default Header;