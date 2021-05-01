import React from 'react';
import { Switch,Route, Redirect } from 'react-router-dom';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';

import './App.css';

import Auth from './pages/auth/auth.component';
import Homepage from './pages/auth/homepage/homepage.component';

// NOTE: REMOVE bypassAuth property in production mode!!
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser:null,
      bypassAuth:true
    }
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSapshot(snapshot => {
          this.setState({
            ...this.state,
            currentUser: {
              id:snapshot.id,
            ...snapshot.data()
            }
          })
        });
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
    let content;

    if (this.state.currentUser !== null || this.state.bypassAuth) {
      content = (
        <Homepage/>
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
