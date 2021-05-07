import React from 'react';
import { Switch,Route, Redirect } from 'react-router-dom';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';

import './App.css';

import Auth from './pages/auth/auth.component';
import Homepage from './pages/homepage/homepage.component';

// NOTE: REMOVE bypassAuth property in production mode!!
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser:null,
      bypassAuth:false
    }
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        try {
          const userRef = await createUserProfileDocument(userAuth);
       
          userRef.onSnapshot(snapshot => {
            this.setState({
              ...this.state,
              currentUser: {
                id:snapshot.id,
              ...snapshot.data()
              }
            })
          });
        } catch(error) {
          console.log('Auth error encountered!',error)
        }
      } else {
        this.setState({
          ...this.state,
          currentUser:userAuth
        });
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log(this.state)
    let content;

    if (this.state.currentUser !== null || this.state.bypassAuth) {
      content = (
        <Switch>
            <Route path="/home" exact component={Homepage}/>
           <Redirect to="/home"/>
        </Switch>
      
      )
    } else {
      content = (
        <Switch>
          <Route path="/auth" exact component={Auth}/>
          <Redirect to="/auth"/>
        </Switch>
      )
    }

    return (
    <div className="App">
      {content}
    </div>
    )
  }
}

export default App;
