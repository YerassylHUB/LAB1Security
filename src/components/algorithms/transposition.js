import React,{Component} from 'react';

export default class Transposition extends Component{
    state = {
        transpositionText: null,
        transpositionKey: null
    }

    content = null;

    onTextChange = (e) => {
        this.setState({
            transpositionText: e.target.value
        })
    }

    onKeyChange = (e) => {
        this.setState({
            transpositionKey: e.target.value
        })
    }


    prioritize = (key) => {
        key = key.split('');
        key = Array.from(new Set(key));
        let tmp = key.slice();
        let sorted = [...tmp];
        sorted.sort();
        sorted.join('');

        for(let i = 0; i < key.length; i++){
            key[i]=sorted.indexOf(key[i]);
        }
        return key;
    }

    createTable = (key,priroties,text,isEncrypt) => {
        key = key.split('');
        key = Array.from(new Set(key));
        text = text.split('');

        let matrix = [];
        while (text.length > 0) {
            if(text.length<key.length){
                let size = key.length - text.length;
                
                for(let i = 0; i<size; i++){
                    text.push('_');
                }
            }
            matrix.push(text.splice(0,key.length));
          }

          let tmp = priroties.slice();
          let ordered = [...tmp];
          ordered.sort();
          let pri = priroties.join('');
          console.log(`Ordered ${ordered}`);
          let str = '';
          for(let i = 0; i< ordered.length; i++){
            for(let j = 0; j < matrix.length; j++){
                let ind = ''+ordered[i];
                str += matrix[j][+pri.indexOf(ind)];
            }
          }


        return (
            <div>
                 <table className="table table-bordered">
                    <tr>{key.map(char => {
                        return <td>{char}</td>
                        
                    })}</tr>
                    <tr>{priroties.map(item => {
                        return <td>{item}</td>
                    })}</tr>
                    {matrix.map(arr => {
                        return <tr>{arr.map(item => {
                            return <td>{item}</td>
                        })}</tr>
                    })}
                </table>
                <div>
                <h1>Result: {str}</h1>
                </div>    
            </div>
        )
    }

    generate = (isEncrypt) => {
        let {transpositionText, transpositionKey} = this.state;
        transpositionText = transpositionText.toUpperCase().replaceAll(' ','_');
        transpositionKey = transpositionKey.toUpperCase();

        let priorities = this.prioritize(transpositionKey);

        this.content = this.createTable(transpositionKey,priorities,transpositionText,isEncrypt);
        this.forceUpdate();
    }

    enc = () => {
        this.generate(true);
    }

    dec = () => {
        this.generate(false);
    }

    render(){
        return(
            <div>
                <h1>Transposition encryption</h1>
                    
                    <div className = "form-group">
                        <label>Enter sentence</label>
                        <input type = "text" className="form-control" name="tr_text" 
                         onChange={this.onTextChange}
                         value = {this.state.transpositionText}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Enter keyword</label>
                        <input type="text" className="form-control" name="tr_shift"
                         onChange={this.onKeyChange}
                         value = {this.state.transpositionKey}
                        />
                    </div>
                    <div className = "form-group">
                        <button className="btn btn-primary" onClick={this.enc}>Encrypt</button>
                    </div>                
                    {this.content}
            </div>
        )
    }
}
