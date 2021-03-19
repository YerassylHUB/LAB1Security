import React,{Component} from 'react';


export default class Caesar extends Component {
    state = {
        caesarText: null,
        caesarShift: null,
    }

    content = null;

    onTextChange = (e) => {
        this.setState({
            caesarText: e.target.value
        })
    }

    onShiftChange = (e) => {
        this.setState({
            caesarShift: e.target.value
        })
    }
    generate = (e) =>{
        //Zhanarystan
        let {caesarText, caesarShift} = this.state;
        
        let str ='';
        caesarText = caesarText.toUpperCase();
        for(let i=0;i<caesarText.length;i++){
            console.log(+caesarText.charCodeAt(i));
            if((+caesarText.charCodeAt(i) < 65) || (+caesarText.charCodeAt(i) > 90)){
                str += ' ';
                console.log("HERsE");
                continue;
            }
            str += String.fromCharCode((caesarText.charCodeAt(i)+(+caesarShift)-65)%26+65);
        }

        
        this.content = 
        <div>
            <h3>{caesarText}</h3>
            <h3>{caesarShift}</h3>
            <h3>{str}</h3>
        </div>
        
        this.forceUpdate();        
    }

    render(){
        return (
            <div>
                <h1>This is caesar</h1>
                    
                    <div className = "form-group">
                        <label>Enter sentence</label>
                        <input type = "text" className="form-control" name="caesar_text" 
                        onChange={this.onTextChange}
                        value = {this.state.caesarText}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Shift number</label>
                        <input type="text" className="form-control" name="caesar_shift"
                        onChange={this.onShiftChange}
                        value = {this.state.caesarShift}
                        />
                    </div>
                    <div class="alert alert-warning" role="alert">
                        If you want to decrypt encrypted text, you should put opposite symbol before the shift number.
                    </div>
                    <div className = "form-group">
                        <button className="btn btn-primary" onClick={this.generate}>Encrypt/Decrypt</button>
                    </div>
                
                {this.content}
            </div>
        )
    }
}