import React from 'react';

import './homepage.styles.css';

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
    },
    {
        userId:'32843',
        first: "T'mara",
        last: 'Morrow'
    }
]

class Homepage extends React.Component {
    state = {
        currentCuts: []
    }

    fetchCurrentCuts() {
        // async request to firebase
        return SAMPLE_CUTS;
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            currentCuts:this.fetchCurrentCuts()
        });
    }

    addCut() {
        // async add new cut for the day using user information
            // returns status 200 id done, or an error if unable to add new cut
    }

    render() {
        const {currentCuts} = this.state;
        return (
            <div className="homepage">
                <h1>Current Cuts</h1>
                <ol className="cut-view">
                    {currentCuts.map((cutInfo,idx)=> {
                        return <li key={idx}>{`${cutInfo.first} ${cutInfo.last.slice(0,1)}`}</li> 
                    })}
                </ol>
                <button disabled={currentCuts.length === 3 ? true : false} onClick={this.addCut}>add cut</button>
            </div>
        )
    }
}

export default Homepage;