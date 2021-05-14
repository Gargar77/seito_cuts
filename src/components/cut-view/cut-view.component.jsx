import React from 'react';

import './cut-view.styles.css';


import {ReactComponent as PlusIcon} from '../../assets/plus_sign.svg'
import {ReactComponent as MinusIcon} from '../../assets/minus_sign.svg'
import {ReactComponent as OneIcon} from '../../assets/one.svg';
import {ReactComponent as TwoIcon} from '../../assets/two.svg';
import {ReactComponent as ThreeIcon} from '../../assets/three.svg';

const numberIcons = [
    <div className="list-num"><OneIcon/></div>,
    <div className="list-num"><TwoIcon/></div>,
    <div className="list-num"><ThreeIcon/></div>,
];
const ADD_CUT_URL = "https://us-central1-seito-cuts.cloudfunctions.net/addCut";
const REMOVE_CUT_URL = "https://us-central1-seito-cuts.cloudfunctions.net/removeCut";



class CutView extends React.Component {

    constructor() {
        super();
        this.state = {
            editingCut:false
        }
    }

    async addCut() {
        // async add new cut for the day using user information
        // const token = await this.props.currentUser.getIdToken();
        this.setState({
            ...this.state,
            editingCut:true
        })

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
            alert("Sucessfully added cut!");  
            this.props.updateCuts();
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({
                ...this.state,
                editingCut:false
            })
        }
    }

    async removeCut() {
        this.setState({
            ...this.state,
            editingCut:true
        })

        const {id} = this.props.auth;
        const date = this.props.date;
        const cutData = {
            id,
            date,
        }

        try{
            await fetch(REMOVE_CUT_URL,{
                headers:{
                  'content-type':'application/json'
                },
                method:'DELETE',
                body:JSON.stringify(cutData)
              })
            alert("Sucessfully Removed cut!");  
            this.props.updateCuts();
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({
                ...this.state,
                editingCut:false
            })
        }

    }
    renderCutOptions() {
        const {currentCuts} = this.props;
        const {id} = this.props.auth;
        if (this.state.editingCut) {
            return (
                <div>
                    <div className="lds-dual-ring"></div>
                    <p>Loading...</p>
                </div>
            )
        }
        for (let i = 0; i < currentCuts.length;i++) {
            const cut = currentCuts[i];
            if (cut.id === id) {
                return (
                    <button 
                        className="cut-action-button"
                        disabled={this.state.editingCut} 
                        onClick={this.removeCut.bind(this)}>
                            REMOVE CUT
                            <div><MinusIcon/></div>
                    </button>
                )
            }
        }

        return(
            <button 
                className="cut-action-button"
                disabled={currentCuts.length === 3 || this.state.editingCut} 
                onClick={this.addCut.bind(this)}>
                    ADD CUT
                    <div><PlusIcon/></div>
            </button>
        )
         
    }

    render() {
        const {currentCuts} = this.props;
        return (
            <div className="cut-view">
                <ol className="cut-list">
                    {currentCuts.map((cutInfo,idx)=> {
                    return <li className="cut-item" key={idx}>{numberIcons[idx]}{`${cutInfo.first} ${cutInfo.last.slice(0,1)}.`}</li> 
                    })}
                    {currentCuts.length === 0 ? <p className="no-cut-text">No cuts yet!</p> : null}
                </ol>
                {this.renderCutOptions()}
            </div>
        )
    }
}


export default CutView

