import React,{Component} from 'react';

export default class PlayFair extends Component{

    state = {
        playfairText: null,
        playfairKey: null
    }

    content = null;

    onTextChange = (e) => {
        this.setState({
            playfairText: e.target.value 
        })
    }

    onKeyChange = (e) => {
        this.setState({
            playfairKey: e.target.value
        })
    }

    defineIndex = (char,matrix) => {
        console.log(`${char} on define`)
        for(let i = 0; i<matrix.length;i++){
            for(let j=0; j<matrix[i].length;j++){
                
                if(matrix[i][j]===char){
                    return ''+i+j;
                }
            }
        }
    }
    
    pairEncrypting = (first,second,matrix) => {
        
        first = first.split('');
        second = second.split('');
        if(first[0]===second[0]){
            first[1]=(+first[1]+1)%5;
            second[1]=(+second[1]+1)%5;
            return ''+matrix[+first[0]][+first[1]]+matrix[+second[0]][+second[1]];
        }
        if(first[1]===second[1]){
            first[0]=(+first[0]+1)%5;
            second[0]=(+second[0]+1)%5;
            return ''+matrix[+first[0]][+first[1]]+matrix[+second[0]][+second[1]];
        }
        let tmp=first[1];
        first[1]=second[1];
        second[1]=tmp;
        return ''+matrix[+first[0]][+first[1]]+matrix[+second[0]][+second[1]];

    }

    pairDecrypting = (first,second,matrix) => {
        
        first = first.split('');
        second = second.split('');
        if(first[0]===second[0]){
            first[1]=((+first[1]-1)<0? 4 : (+first[1]-1))%5;
            second[1]=((+second[1]-1)<0? 4 : (+second[1]-1))%5;
            return ''+matrix[+first[0]][+first[1]]+matrix[+second[0]][+second[1]];
        }
        if(first[1]===second[1]){
            first[0]=((+first[0]-1)<0? 4 : (+first[0]-1))%5;
            second[0]=((+second[0]-1)<0? 4 : (+second[0]-1))%5;
            return ''+matrix[+first[0]][+first[1]]+matrix[+second[0]][+second[1]];
        }
        let tmp=first[1];
        first[1]=second[1];
        second[1]=tmp;
        return ''+matrix[+first[0]][+first[1]]+matrix[+second[0]][+second[1]];

    }

    processing = (text, matrix, isEncrypt) => {
        let str = '';

        console.log(`${text} on processing method`);
        for(let i = 0; i < text.length; i++){
                let first = this.defineIndex(text[i][0],matrix);
                let second = this.defineIndex(text[i][1],matrix);
                if(isEncrypt){
                str+=this.pairEncrypting(first,second,matrix);
                }
                if(!isEncrypt){
                    str+=this.pairDecrypting(first,second,matrix);
                }
                str+=' '; 
        }
        console.log(`${str} on processing method`);
        return str.split(' ');

    }

    createTable = (text,isEncrypt) => {
        let {playfairText, playfairKey} = this.state;
        let table = Array.from(new Set(playfairKey.toUpperCase().split('')));
        let restLetters = [];
        let matrix = [];
        for(let i = 0;i<26;i++){
            if(i===9){
                continue;
            }
            if(table.includes(String.fromCharCode(65+i))){
                continue;
            }
            restLetters.push(String.fromCharCode(65+i));
        }

        table = [...table,...restLetters];
        while (table.length > 0) {

            let chunk = table.splice(0,5)
          
            matrix.push(chunk);
          
          }
          
        text = this.processing(text,matrix,isEncrypt);
        text = text.join('');

        return(
            <div>{text}
            <table className="table table-bordered">
                    {matrix.map(arr => {
                        return <tr>{arr.map(item => {
                            return <td>{item}</td>
                        })}</tr>
                    })}
                </table>
                </div>
        )
    }

    generate = (isEncrypt) => {
        let {playfairText, key} = this.state;
        
        playfairText = playfairText.replaceAll(' ','').replaceAll('j','i').replaceAll('J','I');
        playfairText = playfairText.toUpperCase();

        let str = "";
        

        if(isEncrypt){
            if(playfairText.length % 2 !==0){
                playfairText+='X';
            }
        }

        playfairText=playfairText.replace(/.{1,2}(?=(.{2})+$)/g, '$& ');
        let pairs = playfairText.split(' ');
        console.log(pairs);
        for(let i=0;i<pairs.length;i++){
            if(pairs[i][0]===pairs[i][1]){
                pairs[i]=pairs[i][0]+pairs[i][1].replace(pairs[i][1],'X');
            }
        }
        playfairText = pairs; 
        this.content = this.createTable(playfairText,isEncrypt);
        
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
                <h1>Playfair encryption</h1>
                    
                    <div className = "form-group">
                        <label>Enter sentence</label>
                        <input type = "text" className="form-control" name="playfair_text" 
                         onChange={this.onTextChange}
                         value = {this.state.playfairText}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Enter keyword</label>
                        <input type="text" className="form-control" name="playfair_shift"
                         onChange={this.onKeyChange}
                         value = {this.state.playfairKey}
                        />
                    </div>
                    <div className = "form-group">
                        <button className="btn btn-primary" onClick={this.enc}>Encrypt</button>
                        <button className="btn btn-primary" onClick={this.dec}>Decrypt</button>
                    </div>
                    <div class="alert alert-warning" role="alert">
                        Never type letter "J" and "j". Use "I" and "i" instead of these.  
                    </div>
                {this.content}
            </div>
        )
    }
}