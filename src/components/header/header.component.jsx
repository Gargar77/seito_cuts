import React from 'react';

import './header.styles.css';
import { auth } from '../../firebase/firebase.utils';

const Header = () => (
    <div className="main-header">
      <button onClick={()=> auth.signOut()}>Logout</button>
    </div>
)

export default Header;