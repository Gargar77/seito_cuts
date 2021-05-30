import React from 'react';

import './homepage.styles.css';
import CutView from '../../components/cut-view/cut-view.component';
import {firestore} from '../../firebase/firebase.utils';
import {ReactComponent as LeftArrow} from '../../assets/arrow_color_left.svg';
import {ReactComponent as RightArrow} from '../../assets/arrow_color_right.svg';

const MAX_ALLOWED_DAYS = 5;

class Homepage extends React.Component {
    state = {
        fetchingCuts:true,
        cuts:{},
        allowedDates:[],
        beautifiedDates:[],
        currentDay:0,
        noFetching:true
    }

    getAllowedDays(max) {
        const today = new Date();
        // let dayOfMonth = today.getDate();
        const dates = [];
        const beautifiedDates = [];
        let currDate = today;
        for (let i = 0; i < max; i++) {
            dates.push(this.getStringDate(currDate));
            beautifiedDates.push(this.getBeautifiedDates(currDate));
            currDate.setDate(currDate.getDate()+1);
        }
        return [dates,beautifiedDates];
    }

    getStringDate(date) {
        // const today = new Date();
        let stringDate =   (date.getMonth() + 1) + '_' + date.getDate() + '_' + date.getFullYear();
        return stringDate;
    }

    getBeautifiedDates(date) {
        const [day,month,dayNum] = date.toString().split(' ');        
        return `${day}, ${month} ${dayNum}`
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

    async updateCuts(allowedDates,beautifiedDates) {
        const cuts = {};
        this.setState({
            ...this.state,
            fetchingCuts:true
        })
        for(let i = 0; i < allowedDates.length; i++) {

            let fetchedData = await this.fetchCurrentCuts(allowedDates[i]);
            cuts[allowedDates[i]] = fetchedData;
        }
      
        this.setState({
            ...this.state,
            cuts,
            allowedDates:allowedDates,
            beautifiedDates:beautifiedDates,
            fetchingCuts:false
        });
    }

    componentDidMount() {
        const [allowedDates,beautifiedDates] = this.getAllowedDays(MAX_ALLOWED_DAYS);
        this.updateCuts(allowedDates,beautifiedDates);
    }

    displayCuts(idx) {
        const {cuts,allowedDates,beautifiedDates} = this.state;
        const cutData = cuts[allowedDates[idx]];
        return (
            <CutView auth={this.props.auth} date={allowedDates[idx]} currentCuts={cutData} updateCuts={()=>this.updateCuts(allowedDates,beautifiedDates)}/>
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
        const {fetchingCuts,currentDay,beautifiedDates} = this.state;
        return (
            <div className="homepage">
                <h1>Current Cuts</h1>
                <div>
                <div className="date-selection-container">
                    <LeftArrow className={`arrow ${currentDay <= 0 ? 'disabled':''}`} onClick={()=> this.changeDay('prev')}/>
                    <p>{beautifiedDates[currentDay]}</p>
                    <RightArrow className={`arrow ${currentDay >= MAX_ALLOWED_DAYS -1 ? 'disabled':''}`} onClick={()=> this.changeDay('next')}/>
                </div>
                {fetchingCuts ? <p>loading...</p> : this.displayCuts(currentDay)}
                </div>
            </div>
        )
    }
}

export default Homepage;