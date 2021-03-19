import React,{Component} from 'react';

export default class AccessControl extends Component{

    state = {
        signUpLogin:"",
        signUpPassword:"",
        signUpMessage:"",
        signInLogin:"",
        signInPassword:"",
        signInMessage:""
    }

    

    addUser = async(e) => {
        e.preventDefault();
        const {signUpLogin,signUpPassword} = this.state;
        const data = {
            email:signUpLogin,
            password:signUpPassword
        }
        let response = await fetch("http://localhost:8000/security/adduser",
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
        console.log(`${needed.text}`)        
        this.setState({
            signUpLogin: "",
            signUpPassword: "",
            signUpMessage:needed.text
        })
        
    }    

    login = async(e) => {
        e.preventDefault();
        const {signInLogin,signInPassword} = this.state;
        const data = {
            email:signInLogin,
            password:signInPassword
        }
        let response = await fetch("http://localhost:8000/security/login",
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
        console.log(`${needed.text}`)        
        this.setState({
            signInLogin: "",
            signInPassword: "",
            signInMessage:needed.text
        })
        
    }  

    onSignUpLoginChange = (e) => {
        this.setState({
            signUpLogin: e.target.value
        })
    }

    onSignUpPasswordChange = (e) => {
        this.setState({
            signUpPassword: e.target.value
        })
    }

    onSignInLoginChange = (e) => {
        this.setState({
            signInLogin: e.target.value
        })
    }

    onSignInPasswordChange = (e) => {
        this.setState({
            signInPassword: e.target.value
        })
    }

    messageSI = () => {
        if(this.state.signInMessage!==""){
            if(this.state.signInMessage!=="Signed In"){
                return(
                    <div class="alert alert-danger" role="alert">
                        {this.state.signInMessage}
                    </div>
                )
            }
            else{
                return(
                    <div class="alert alert-success" role="alert">
                        {this.state.signInMessage}
                        <a href="http://localhost:8000/security/file/26478.pdf" >Click here to get file</a>
                    </div>
                )
            }
        }

        return null;
    }

    

    messageSU = () => {
        if(this.state.signUpMessage!==""){
            if(this.state.signUpMessage!=="User Successfully Added"){
                return(
                    <div class="alert alert-danger" role="alert">
                        {this.state.signUpMessage}
                    </div>
                )
            }
            else{
                return(
                    <div class="alert alert-success" role="alert">
                        {this.state.signUpMessage}
                    </div>
                )
            }
        }

        return null;
    }

    render(){
        return (
            <div>
                <h1>Access Control</h1>
                <div className="row mt-5">
                    <div className="col-md-5">
                        <form onSubmit={this.login}>
                            <h5>Sign In</h5>
                            <div className="form-group">
                                <label>Email</label>
                                <input className="form-control" type="email"
                                onChange={this.onSignInLoginChange} 
                                value={this.state.signInLogin}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input className="form-control" type="password"
                                onChange={this.onSignInPasswordChange} 
                                value={this.state.signInPassword}
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Sign In</button>
                            </div>
                            {this.messageSI()}
                        </form>
                    </div>
                    <div className="col-md-5 offset-2">
                        <form onSubmit={this.addUser}>
                            <h5>Sign Up</h5>
                            <div className="form-group">
                                <label>Email</label>
                                <input className="form-control" type="email" 
                                onChange={this.onSignUpLoginChange} 
                                value={this.state.signUpLogin}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input className="form-control" type="password"
                                onChange={this.onSignUpPasswordChange} 
                                value={this.state.signUpPassword}
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                            {this.messageSU()}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}