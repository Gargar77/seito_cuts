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
        currentCuts: SAMPLE_CUTS
    }

    fetchCurrentCuts() {
        // async request to firebase
    }

    componentDidMount() {
        this.fetchCurrentCuts();
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
            </div>
        )
    }
}

export default Homepage;