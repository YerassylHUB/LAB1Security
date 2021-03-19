import React,{Component} from 'react';
import Caesar from './../algorithms/caesar';
import Vigenere from './../algorithms/vigenere';
import PlayFair from './../algorithms/playfair';
import Transposition from './../algorithms/transposition';
import Blowfish from '../algorithms/blowfish';
import AccessControl from '../algorithms/accessControl';
import RSA from '../algorithms/rsa';

export default class EncArea extends Component{

    state = {
        selectedItem: 1
    }


    componentDidMount(){
        this.setState({
            selectedItem:1
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.selectedItem !== prevProps.selectedItem) {
            console.log(this.props.selectedItem);
            this.setState({
                selectedItem: this.props.selectedItem
            })
        }
    }
    
    render(){
        
        return(
            <>  
                <LoadContent id={this.state.selectedItem}/>
            </>
        )
    }
}

const LoadContent = (props) => {

    let content = <Caesar/>
    if(props.id === 2){
        content = <Vigenere/>
    }
    else if(props.id === 3){
        content = <PlayFair/>
    }
    else if(props.id === 4){
        content = <Transposition/>
    }
    else if(props.id === 5){
        content = <RSA/>
    }
    else if(props.id === 6){
        content = <AccessControl/>
    }
    return content
}







