import React from 'react';

import './homepage.styles.css';

import {auth,firestore} from '../../firebase/firebase.utils';

const SAMPLE_CUTS = [
    {
        userId:'124458',
        first: 'Gary',
        last: 'Bautista'
    },
    {
        userId:'44839',
        first: 'Bianca',
        last: 'Dessouki'
    }
]

const SERVER_URL = "http://localhost:5001/seito-cuts/us-central1/addMessage";

class Homepage extends React.Component {
    state = {
        currentCuts: [],
        fetchingCuts:false
    }

     async fetchCurrentCuts() {
        // async request to firebase
        const cutsRef = firestore.collection('cuts').doc('05_08_2021');
        const doc =  await cutsRef.get();
        const data = doc.data().cutData;
        return data;
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
        this.setState({
            ...this.state,
            fetchingCuts:true
        });

        this.updateCuts();
    }

    async addCut() {
        // async add new cut for the day using user information
        console.log('fetching');
        const token = await auth.currentUser.getIdToken();
              await fetch(SERVER_URL,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
                body:`Hello Moto @${new Date().getSeconds()}`,
                method:'POST'
            })
            .then( res => res.json())
            .then( data => console.log(data))
        console.log('finished request');
    }

    render() {
        const {currentCuts,fetchingCuts} = this.state;
        console.log(this.state)
        return (
            <div className="homepage">
                <h1>Current Cuts</h1>
                <ol className="cut-view">
                    {currentCuts.map((cutInfo,idx)=> {
                        return <li key={idx}>{`${cutInfo.first} ${cutInfo.last.slice(0,1)}`}</li> 
                    })}
                    {fetchingCuts ? <p>loading...</p> : null}
                </ol>
                <button disabled={currentCuts.length === 3 ? true : false} onClick={this.addCut}>add cut</button>
            </div>
        )
    }
}

export default Homepage;