import React from 'react';

import './homepage.styles.css';

const SAMPLE_CUTS = [
    {
        first: 'Gary',
        last: 'Bautista'
    },
    {
        first: 'Bianca',
        last: 'Dessouki'
    },
    {
        first: "T'mara",
        last: 'Morrow'
    }
]

class Homepage extends React.Component {
    state = {
        currentCuts: SAMPLE_CUTS
    }

    render() {
        return <h1>HomePage</h1>
    }
}

export default Homepage;