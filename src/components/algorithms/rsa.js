import React,{Component} from 'react';

export default class RSA extends Component{

    state = {
        plaintext: null,
        p: null,
        q: null,
        encryptedText: [],
        decryptedText: []
    }

    incorrectInput = null;
    
    disabled = "disabled"; 

    receiverForm = null;

    encrypted = null;

    decrypted = null;

    content = null;

    isPrime = (n) => {
        if (n===1){
            return false;
        }
        else if(n === 2)
        {
            return true;
        }
        else{
            for(let x = 2; x < n; x++){
                if(n % x === 0){
                    return false;
                }
            }
            return true;  
        }
    }

    getASCIISequence = (text) => {
        let sequence = [];

        for(let i=0;i<text.length;i++){
            sequence.push(text.charCodeAt(i));
        }

        return sequence;
    }

    onTextChange = (e) => {
        this.setState({
            plaintext: e.target.value
        })
    }

    onP1Change = (e) => {
        this.setState({
            p: e.target.value
        })
    }

    onP2Change = (e) => {
        this.setState({
            q: e.target.value
        })
    }

    // onEChange = (e) => {
    //     this.setState({
    //         e: e.target.value
    //     })
    // }

    // onDChange = (e) => {
    //     this.setState({
    //         d: e.target.value
    //     })
    // }

    // computeN = (p1,p2) => {
    //     return p1*p2;
    // }

    // computeFi = (p1,p2) => {
    //     return (p1 - 1) * (p2 - 1);
    // }

    // encode = (sequence, N, e) => {
    //     console.log(sequence);
    //     let encryptedSequence = [];
    //     for(let i = 0; i<sequence.length; i++){
    //         encryptedSequence.push(Math.trunc((sequence[i] ** e))%N);
    //     }

    //     console.log(encryptedSequence);
    //     return encryptedSequence;
    // }

    // decode = (sequence, d, N) => {
    //     console.log(`decode ${sequence}`);
    //     let decryptedSequence = [];
    //     for(let i = 0; i<sequence.length; i++){
    //         decryptedSequence.push(Math.trunc(sequence[i] ** d)%N);
    //     }
    //     console.log(`decode1 ${d}`);
    //     return decryptedSequence;
    // }

    // incorrectInput1 = null;
    // generatePrivate = () => {
    //     let {e, d, fi} = this.state;

    //     if(d === 1 || this.isPrime(d) === false || ((d * e) % fi) !== 1){
    //         this.incorrectInput1 =  <div class="alert alert-warning mt-2 mb-2" role="alert">
    //                                     Try another number, this number doesn't satisfy condition given below
    //                                 </div>
    //     }
    //     else{
    //         this.setState({
    //             d
    //         })
    //         this.incorrectInput1 = null;
    //         console.log(`prive ${this.state.N}`)
    //         this.decrypted = this.decode(this.encrypted, +d, this.state.N);
    //         console.log(`Dec ${this.decrypted}`)
    //         this.forceUpdate();   
    //     }
    // }

    send = async(data) => {
        let response = await fetch("http://localhost:8000/security/send",
        {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
          });
        let needed = await response.json();
        console.log(`HIHIHI ${needed.p}`)
        this.setState({
            encryptedText: needed.encryptedText,
            decryptedText: needed.decryptedText
        });
        
    }

    generatePublic = () => {
        let {plaintext, p, q} = this.state;

        this.content = null;
        if(!this.isPrime(+p)){
            this.incorrectInput = <div class="alert alert-warning mt-2 mb-2" role="alert">
                p isn't prime, try again
            </div>
        }

        else if(!this.isPrime(+q)){
            this.incorrectInput = <div class="alert alert-warning mt-2 mb-2" role="alert">
                q isn't prime, try again
            </div>
        }
        else if(p*q < 123){
            this.incorrectInput = <div class="alert alert-warning mt-2 mb-2" role="alert">
                {p*q} doesn't exceeds 123
            </div>
        }
        
        else{
            plaintext = this.getASCIISequence(plaintext);
            const data = {
                plaintext,
                p,
                q
            };
            this.send(data);
            this.receiverForm = <div>
            <h4>Receiver</h4>
            <br/>
            Encrypted message
        </div>
        this.decrypted = <div>
            Decrypter message
            <br/>
        </div>
        }
        this.forceUpdate();
    }


    render(){
        return(
            <div>
                <h1>RSA Encryption</h1>
                <h4>Sender</h4>
                <div className = "form-group">
                    <label>Enter text</label>
                    <input type = "text" className="form-control" name="blowfish_text" 
                    onChange={this.onTextChange}
                    value = {this.state.plaintext}
                    />
                </div>
                <div className = "form-group">
                <div class="alert alert-warning mt-2 mb-2" role="alert">
                        p and q must be prime numbers and multiplication of them must exceed 127. Because maximum ascii char code is 127.
                </div>
                    <div className="d-flex">
                        <div className="mr-2">
                            <label>Enter P1</label>
                            <input type="number" className="form-control" name="blowfish_shift"
                            onChange={this.onP1Change}
                            value = {this.state.p}
                            />
                        </div>
                        <div className="mr-2">
                            <label>Enter P2</label>
                            <input type="number" className="form-control" name="blowfish_shift"
                            onChange={this.onP2Change}
                            value = {this.state.q}
                            />
                        </div>
                    </div>
                </div>
                
                {this.incorrectInput}
                <div className = "form-group">
                    <button  className="btn btn-primary" onClick={this.generatePublic}>Send</button>
                </div>
                {this.receiverForm}
                <p>{this.state.encryptedText.join("") }</p>
                {this.decrypted}
                <p>{this.state.decryptedText.map((item) => {
                    return String.fromCharCode(item)
                })

                    .join("") }</p>
                
            </div>
        )
    }

}