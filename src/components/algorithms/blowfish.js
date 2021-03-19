import React,{Component} from 'react';


export default class Blowfish extends Component{
    state = {
        blowfishText: null,
        blowfishKey: null
    }

    content = null;

    onTextChange = (e) => {
        this.setState({
            blowfishText: e.target.value 
        })

    }

    onKeyChange = (e) => {
        this.setState({
            blowfishKey: e.target.value
        })
    }
    // modVal = Math.pow(2, 32);
    // hexToBin(plainText) 
    // { 
    //     let binary = ""; 
    //     let num; 
    //     let binary4B; 
    //     let n = plainText.length; 
    //     for (let i = 0; i < n; i++) { 
  
    //         num = parseInt(plainText.charAt(i) + "", 16); 
    //         binary4B = num.toString(2); 
  
    //         binary4B = "0000" + binary4B; 
  
    //         binary4B = binary4B.substring(binary4B.length - 4); 
    //         binary += binary4B; 
    //     } 
    //     return binary; 
    // } 

    // binToHex(plainText){ 
  
    //     let num = parseInt(plainText, 2); 
    //     let hexa = num.toString(16); 
    //     while (hexa.length < (plainText.length / 4)) 
    //         // maintain output length same length 
    //         // as input by appending leading zeroes. 
    //         hexa = "0" + hexa; 
    //     return hexa; 
    // }; 

    // xor(a, b){ 
    //     a = this.hexToBin(a);
    //     b = this.hexToBin(b);
    //     let ans = "";
    //     for (let i = 0; i < a.length; ++i) {
    //       ans += String.fromCharCode(
    //         ((a.charAt(i).charCodeAt(0) - "0".charCodeAt(0)) ^
    //           (b.charAt(i).charCodeAt(0) - "0".charCodeAt(0))) +
    //           "0".charCodeAt(0)
    //       );
    //     }
    //     ans = this.binToHex(ans);
    //     return ans;
    // }; 

    // addBin(a,b){
    //     let ans = "";
    //     let n1 = parseInt(a, 16);
    //     let n2 = parseInt(b, 16);
    //     n1 = (n1 + n2) % this.modVal;
    //     ans = n1.toString(16);
    //     ans = "00000000" + ans;
    //     return ans.substr(ans.length - 8);
    // }

    // f(plainText){
    //     const a = Array(4);
    //     let ans = "";
    //     for (let i = 0; i < 8; i += 2) {
    //       const col = parseInt(this.hexToBin(plainText.substr(i, 2)), 2);
    //       a[Math.floor(i / 2)] = S[Math.floor(i / 2)][col];
    //     }
    //     ans = this.addBin(a[0], a[1]);
    //     ans = this.xor(ans, a[2]);
    //     ans = this.addBin(ans, a[3]);
    //     return ans;
    //   };

    //   keyGenerate(key){
    //     let j = 0;
    //     for (let i = 0; i < P.length; ++i) {
    //       P[i] = this.xor(P[i], key.substr(j, 8));
      
    //       console.log(`subkey ${i + 1} : ${P[i]}`);
      
    //       j = (j + 8) % key.length;
    //     }
    //   };

    //   round(time, plainText){
    //     let left = plainText.substr(0, 8);
    //     let right = plainText.substr(8, 8);
    //     left = this.xor(left, P[time]);
      
    //     const fOut = this.f(left);
      
    //     right = this.xor(fOut, right);
      
    //     console.log(`round ${time} : ${right + left}`);
      
    //     return right + left;
    //   };

       

    encrypt = (e) => 
    { 
        // let plainText = this.state.blowfishText;
        // for (let i = 0; i < 16; i++) 
        //     plainText = this.round(i, plainText); 
  
        // // postprocessing 
        // let right = plainText.substring(0, 8); 
        // let left = plainText.substring(8, 16); 
        // right = this.xor(right, P[16]); 
        // left = this.xor(left, P[17]); 
        // plainText = null;
        // this.keyGenerate(this.state.blowfishKey);
        // this.content = left + right; 
        // this.forceUpdate();
        const Blowfish = require('egoroof-blowfish');
        const bf = new Blowfish(this.state.blowfishKey, Blowfish.MODE.ECB, Blowfish.PADDING.NULL); // only key isn't optional
        bf.setIv('abcdefgh'); // optional for ECB mode; bytes length should be equal 8
 
        const encoded = bf.encode(this.state.blowfishText, Blowfish.TYPE.UINT8_ARRAY);
        const decoded = bf.decode(this.state.blowfishText, Blowfish.TYPE.STRING);

        this.content = encoded+" "+decoded;
        this.forceUpdate();
    } 

    decrypt = (e) => 
    { 
        const Blowfish = require('egoroof-blowfish');
        const bf = new Blowfish(this.state.blowfishKey, Blowfish.MODE.ECB, Blowfish.PADDING.NULL); // only key isn't optional
        bf.setIv('abcdefgh'); // optional for ECB mode; bytes length should be equal 8
 
        const decoded = bf.decode(this.state.blowfishText, Blowfish.TYPE.STRING);
        this.content = decoded;
        this.forceUpdate();
    } 

   

   
    
    // enc = () => {
    //     this.keyGenerate(this.state.blowfishKey);
    //     this.content=this.encrypt(this.state.blowfishText);
        
    //     this.forceUpdate();
        
    // }

    // dec = () => {
    //     this.keyGenerate(this.state.blowfishKey);
    //     this.content=this.decrypt(this.state.blowfishText);
        
    //     this.forceUpdate();
       
    // }
    

    render(){
        return(
            <div>
                <h1>Blowfish</h1>
                
                <div className = "form-group">
                    <label>Enter sentence</label>
                    <input type = "text" className="form-control" name="blowfish_text" 
                    onChange={this.onTextChange}
                    value = {this.state.blowfishText}
                    />
                </div>
                <div className = "form-group">
                    <label>Enter keyword</label>
                    <input type="text" className="form-control" name="blowfish_shift"
                    onChange={this.onKeyChange}
                    value = {this.state.blowfishKey}
                    />
                </div>
                <div className = "form-group">
                    <button type="submit" className="btn btn-primary" onClick={this.encrypt}>Encrypt</button>
                    <button className="btn btn-primary" onClick={this.decrypt}>Decrypt</button>
                </div>
                
                {this.content}
    </div>
        )
    }
}