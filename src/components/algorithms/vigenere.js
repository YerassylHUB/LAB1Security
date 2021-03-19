import React,{Component} from 'react';

export default class Vigenere extends Component {
    
    state={
        vigenereText:null,
        vigenereKey:null
    }

    content=null;
    onTextChange = (e) => {
        this.setState({
            vigenereText: e.target.value
        })
    }

    onKeyChange = (e) => {
        this.setState({
            vigenereKey: e.target.value
        })
    }

    textElem = null;
    keyStr = null;
    doCrypt = (isDecrypt) => {
        this.keyStr = this.state.vigenereKey;
        this.textElem = this.state.vigenereText;
        if (this.keyStr.length === 0) {
			alert("Key is empty");
			return;
		}
		
		let keyArray = this.filterKey(this.keyStr);
		if (keyArray.length === 0) {
			alert("Key has no letters");
			return;
		}
		
		if (isDecrypt) {
			for (var i = 0; i < keyArray.length; i++)
				keyArray[i] = (26 - keyArray[i]) % 26;
		}
		
        console.log(`doCrypt ${this.textElem}`);
		this.textElem = this.crypt(this.textElem, keyArray);
		
    };
    
    crypt = (input, key) => {
		let output = "";
		for (var i = 0, j = 0; i < input.length; i++) {
			var c = input.charCodeAt(i);
			if (this.isUppercase(c)) {
				output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
				j++;
			} else if (this.isLowercase(c)) {
				output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
				j++;
			} else {
				output += input.charAt(i);
			}
		}
		return output;
    }
    filterKey = (key) => {
		var result = [];
		for (var i = 0; i < key.length; i++) {
			var c = key.charCodeAt(i);
			if (this.isLetter(c))
				result.push((c - 65) % 32);
		}
		return result;
    }
    
    isLetter = (c) => {
		return this.isUppercase(c) || this.isLowercase(c);
	}
    
    isUppercase = (c) => {
		return 65 <= c && c <= 90;  // 65 is character code for 'A'. 90 is 'Z'.
	}
     
    isLowercase = (c) => {
		return 97 <= c && c <= 122;  // 97 is character code for 'a'. 122 is 'z'.
    }
    
    createTable(isDecrypt,key){
        let allLetters = [];
        for(let i=0;i<26;i++){
            allLetters.push(String.fromCharCode(65+i));
        }

        key = key.split('');
        let matrix = [];
        matrix.push(allLetters);
        for(let i=0;i<key.length;i++){
            let arr=[];
            for(let j=0;j<26;j++){
                arr.push(String.fromCharCode((key[i].charCodeAt(0)+j-65)%26+65));
            }
            matrix.push(arr);
        }
        this.doCrypt(isDecrypt);
       return( 
            <div>
                <table className="table table-bordered">
                    {matrix.map(arr => {
                        return <tr>{arr.map(item => {
                            return <td>{item}</td>
                        })}</tr>
                    })}
                </table>
                {this.textElem}
            </div>
            )
    }

    encrypt = () => {
        let {vigenereKey} = this.state;
        vigenereKey = vigenereKey.toUpperCase().split(' ')[0];
        

        this.content=this.createTable(false,vigenereKey);
        
        this.forceUpdate();
    }

    decrypt = () =>{
        let {vigenereKey} = this.state;
        
        vigenereKey = vigenereKey.toUpperCase().split(' ')[0];
        

        this.content=this.createTable(true,vigenereKey);
        
        this.forceUpdate();
    }
    render(){
        return(
            <div>
                <h1>Vigenère encryption</h1>
                    
                    <div className = "form-group">
                        <label>Enter sentence</label>
                        <input type = "text" className="form-control" name="vigenere_text" 
                         onChange={this.onTextChange}
                         value = {this.state.vigenereText}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Enter keyword</label>
                        <input type="text" className="form-control" name="vigenere_shift"
                         onChange={this.onKeyChange}
                         value = {this.state.vigenereKey}
                        />
                    </div>
                    <div className = "form-group">
                        <button className="btn btn-primary" onClick={this.encrypt}>Encrypt</button>
                        
                        <button className="btn btn-primary" onClick={this.decrypt}>Decrypt</button>
                    </div>
                
                {this.content}
            </div>
        )
    }
} 