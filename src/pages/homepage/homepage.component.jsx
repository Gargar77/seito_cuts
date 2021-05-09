import React from 'react';

import './homepage.styles.css';
import CutView from '../../components/cut-view/cut-view.component';
import {firestore} from '../../firebase/firebase.utils';

const MAX_ALLOWED_DAYS = 3;

class Homepage extends React.Component {
    state = {
        fetchingCuts:true,
        cuts:{},
        allowedDates:[],
        currentDay:0,
        noFetching:true
    }

    getAllowedDays(max) {
        const today = new Date();
        let dayOfMonth = today.getDate();
        const dates = [];
        let currDate = today;
        for (let i = 0; i < max; i++) {
            dates.push(this.getStringDate(currDate));
            dayOfMonth++;
            currDate.setDate(dayOfMonth);
        }
        return dates;
    }

    getStringDate(date) {
        // const today = new Date();
        let stringDate =   (date.getMonth() + 1) + '_' + date.getDate() + '_' + date.getFullYear();
        return stringDate;
    }

    createDoc(dateString) {
        firestore.collection('cuts').doc(dateString).set({
            cutData:[]
        });
        
    }

     async fetchCurrentCuts(dateString) {
        // async request to firebase
        const cutsRef = firestore.collection('cuts').doc(dateString);
        const doc =  await cutsRef.get();
        
        const data = doc.data();
        if (!data) {
            this.createDoc(dateString);
            return [];
        } else {
            return data.cutData;
        }
    }

    async updateCuts(allowedDates) {
        // NOTE: fetching temporarly disabled for styling phase
        // const cuts = {};
        this.setState({
            ...this.state,
            fetchingCuts:true
        })
        // for(let i = 0; i < allowedDates.length; i++) {
        //     let fetchedData = await this.fetchCurrentCuts(allowedDates[i]);
        //     cuts[allowedDates[i]] = fetchedData;
        // }
        const cuts = {
            "5_9_2021":[
                {id:'BHb69Qor2uTFt336Gjqab3G6Wuh2',first:'Gary',last:'Bautista'},
                {id:'3pd32j923',first:"Monkey",last:"Oscar"}
            ],
            "5_10_2021":[],
            "5_11_2021":[]
        }
      
        this.setState({
            ...this.state,
            cuts,
            allowedDates,
            fetchingCuts:false
        });
    }

    componentDidMount() {
        const allowedDates = this.getAllowedDays(MAX_ALLOWED_DAYS);
        this.updateCuts(allowedDates);
    }

    displayCuts(idx) {
        const {cuts,allowedDates} = this.state;
        const cutData = cuts[allowedDates[idx]];
        return (
            <CutView auth={this.props.auth} date={allowedDates[idx]} currentCuts={cutData} updateCuts={()=>this.updateCuts(allowedDates)}/>
        )
    }

    changeDay(type) {
        this.setState((prevState) => {
            let currentDay = prevState.currentDay;
            if (type === 'prev') {
                currentDay--;
                if (currentDay < 0) currentDay = 0;
                
            } else {
                currentDay++;
                if (currentDay >= MAX_ALLOWED_DAYS) currentDay = MAX_ALLOWED_DAYS -1
            }

            return {
                ...prevState,
                currentDay
            }
        })
    }

    render() {
        const {fetchingCuts,currentDay} = this.state;
        console.log(this.state);
        return (
            <div className="homepage">
                <h1>Current Cuts</h1>
                <button disabled={currentDay <= 0} onClick={()=> this.changeDay('prev')}>Prev day</button>
                <button disabled={currentDay >= MAX_ALLOWED_DAYS -1} onClick={()=> this.changeDay('next')}>Next day</button>
         
                {fetchingCuts ? <p>loading...</p> : this.displayCuts(currentDay)}
            </div>
        )
    }
}

export default Homepage;