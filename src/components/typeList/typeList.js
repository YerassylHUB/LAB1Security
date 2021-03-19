import React, {Component} from 'react';

export default class TypeList extends Component{

    render(){
        return(
            <ul class="list-group">
                <li className="list-group-item">Type of Encryption</li>
                <li className="list-group-item">LAB 2: </li>
                {/* <li className="list-group-item" key='1' onClick={() => this.props.onItemSelected(1)}><button className="btn btn-outline-primary">Caesar cipher </button></li> */}
                {/* <li className="list-group-item" key='2' onClick={() => this.props.onItemSelected(2)}><button className="btn btn-outline-primary">Vigenère cipher</button> </li> */}
                {/* <li className="list-group-item" key='3' onClick={() => this.props.onItemSelected(3)}><button className="btn btn-outline-primary">Playfair cipher</button> </li> */}
                <li className="list-group-item" key='4' onClick={() => this.props.onItemSelected(4)}><button className="btn btn-outline-primary">Transposition</button></li>
                <li className="list-group-item"><a href="http://localhost:8000" className="btn btn-outline-primary">Blowfish</a></li>
                <li className="list-group-item" key='5' onClick={() => this.props.onItemSelected(5)}><button className="btn btn-outline-primary">RSA</button></li>
                <li className="list-group-item" key='6' onClick={() => this.props.onItemSelected(6)}><button className="btn btn-outline-primary">Access Control</button></li>
            </ul>
        )
    }
}