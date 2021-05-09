import React from 'react';

import './homepage.styles.css';

import {auth,firestore} from '../../firebase/firebase.utils';

const ADD_CUT_URL = "http://localhost:5001/seito-cuts/us-central1/addCut";

class Homepage extends React.Component {
    state = {
        currentCuts: [],
        fetchingCuts:false
    }

    getTodaysDate() {
        const today = new Date();
        let stringDate =  '' + today.getDate() + (today.getMonth() + 1) + today.getFullYear();
        return stringDate;
    }

    createDoc() {
        firestore.collection('cuts').doc(this.getTodaysDate()).set({
            cutData:[]
        });
        
    }

     async fetchCurrentCuts() {
        // async request to firebase
        const cutsRef = firestore.collection('cuts').doc(this.getTodaysDate());
        const doc =  await cutsRef.get();
        
        const data = doc.data();
        if (!data) {
            this.createDoc();
            return [];
        } else {
            return data.cutData;
        }
    }

    async updateCuts() {
        let fetchedData = await this.fetchCurrentCuts();
        this.setState({
            ...this.state,
            currentCuts:fetchedData,
            fetchingCuts:false
        });
    }

    componentDidMount() {
        this.getTodaysDate();
        this.setState({
            ...this.state,
            fetchingCuts:true
        });

        this.updateCuts();
    }

    async addCut() {
        // async add new cut for the day using user information
        const token = await auth.currentUser.getIdToken();
        const todaysDate = this.getTodaysDate();
        const { userId,first,last } = this.props;
        const cutData = {
            userId,
            first,
            last,
            date:todaysDate
        }
        try{
            await fetch(ADD_CUT_URL,{
                headers:{
                  Authorization:`Bearer ${token}`,
                  'content-type':'application/json'
                },
                method:'POST',
                body:JSON.stringify(cutData)
              })
              this.updateCuts();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {currentCuts,fetchingCuts} = this.state;
        return (
            <div className="homepage">
                <h1>Current Cuts</h1>
                <ol className="cut-view">
                    {currentCuts.map((cutInfo,idx)=> {
                        return <li key={idx}>{`${cutInfo.first} ${cutInfo.last.slice(0,1)}`}</li> 
                    })}
                    {fetchingCuts ? <p>loading...</p> : null}
                    {currentCuts.length === 0 ? <p>No cuts yet!</p> : null}
                </ol>
                <button disabled={currentCuts.length === 3 ? true : false} onClick={this.addCut.bind(this)}>add cut</button>
            </div>
        )
    }
}

export default Homepage;