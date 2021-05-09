import React from 'react';

import './cut-view.styles.css';


const ADD_CUT_URL = "http://localhost:5001/seito-cuts/us-central1/addCut";


class CutView extends React.Component {

    constructor() {
        super();
        this.state = {
            
        }
    }

    async addCut() {
        // async add new cut for the day using user information
        // const token = await this.props.currentUser.getIdToken();
        const date = this.props.date;
        const { id,first,last } = this.props.auth;
        const cutData = {
            id,
            first,
            last,
            date,
        }
        try{
            await fetch(ADD_CUT_URL,{
                headers:{
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

    removeCut(id) {
        console.log(`removing cut with ID: ${id}`)
    }

    renderCutOptions() {
        const {currentCuts} = this.props;
        const {id} = this.props.auth;
        for (let i = 0; i < currentCuts.length;i++) {
            const cut = currentCuts[i];
            if (cut.id === id) {
                return (
                    <button onClick={()=>this.removeCut(id)}>remove cut</button>
                )
            }
        }

        return(
            <button disabled={currentCuts.length === 3 ? true : false} onClick={this.addCut.bind(this)}>add cut</button>
        )
         
    }

    render() {
        const {currentCuts} = this.props;
        return (
            <div>
                <ol className="cut-view">
                    {currentCuts.map((cutInfo,idx)=> {
                    return <li key={idx}>{`${cutInfo.first} ${cutInfo.last.slice(0,1)}`}</li> 
                    })}
                    {currentCuts.length === 0 ? <p>No cuts yet!</p> : null}
                </ol>
                {this.renderCutOptions()}
            </div>
        )
    }
}


export default CutView

