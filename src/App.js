import React from 'react';
import { Switch,Route, Redirect } from 'react-router-dom';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';

import './App.css';

import Auth from './pages/auth/auth.component';
import Homepage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';

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
    let content;
    const {currentUser} = this.state;
    if (this.state.currentUser !== null || this.state.bypassAuth) {
      content = (
        <div>
           <Header/>
           <Switch>
              <Route path="/home" exact><Homepage userId={currentUser.id} first={currentUser.first} last={currentUser.last}/></Route>
             <Redirect to="/home"/>
           </Switch>
        </div>
       
      
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
