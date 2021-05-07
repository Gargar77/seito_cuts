import React from 'react';

import './header.styles.css';
import { auth } from '../../firebase/firebase.utils';

const Header = () => (
    <button onClick={()=> auth.signOut()}>Logout</button>
)

export default Header;