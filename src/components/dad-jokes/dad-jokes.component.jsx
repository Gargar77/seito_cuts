import React, { useEffect,useState } from 'react';

const DadJokes = () => {
    const [state,setState] = useState([]);
    useEffect(()=> {
        fetch('https://icanhazdadjoke.com/',{headers:{'Accept':'text/plain'}})
        .then(res => res.text())
        .then( data => setState(`"${data}"`))
    },[])
    return <p>{state}</p>
}

export default DadJokes;