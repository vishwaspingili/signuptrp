import React, { Component } from 'react';
import './Signup.css';
import Customgrid from './datagrid';
import Register from './register';

class Signup extends Component {

  constructor() {
    super()
    this.state = {
      username: "",
      showLogin: false,
      is_valid_user:false,

      addprofileclicked: false,

      errormessage:"",
    }
  }

  componentDidMount() {
    this.setState({
      username: ""
    })
  }

  submit(e) {
    this.setState({
      username: "",
      showLogin: true
    })
  }
  
  addregister(e) {

    this.setState({
      addregisterclicked: true
    })
}

handelregister = () => {
  this.setState({
    addregisterclicked: false
  })
}
  switch(e) {
    if (e.target.id === "login") {
      this.setState({
        showLogin: true
      })

    }
    else {
      this.setState({
        showLogin: false
      })
    }
  }
  validate(e) {
    
const username=document.getElementById("user_id").value;
const userpwd=document.getElementById("user_pwd").value

fetch("http://172.16.75.112:8080/trp/login",{

  method: 'POST',
  headers: {

    'Content-Type': 'application/json',
    'cache-control': 'no-cache',

  },  body: JSON.stringify({
    userId: username,
    userPwd: userpwd

    }),

})
      .then(res => res.json())
      .then(
        (result) => {
          const data= result.responseCode
          if(data===null)  
           {
            this.setState({
              is_valid_user: false,
              errormessage:"Invalid UserName or Password"
            }) 
          }   
          else{
            
            if(data.errorCode==="0")
              this.setState({
                is_valid_user: true
               } )
               else{
                 this.setState({
                     errormessage:data.errorMsg
                     
                 })
               }
              }            
                    
                 },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    
}  

  logincontent() {
    return (
      <div className="Login-form">
        <p>User ID:</p>
        <input type="text" name="User Id" id= "user_id" placeholder="Enter User Id" />
        <br />
        <p>Password:</p>
        <input type="password" name="Password" id="user_pwd" placeholder="Enter Your Password" />
        <br />
        <br />
        <div className="button" onClick={(e) => this.validate(e)}>Login</div>

        <br />        
        <p>
          {this.state.errormessage}
        </p>
        <a href="#">Forgot Username or Password</a>
        <br />
                <br/>
                
        <div input type="checkbox" name="Remember" value="Remember me"> Remember me </div>

        <br />
      </div>
      )
      ;
  }

  Signupcontent() {
    return (
      <div className="Signup-form">
        {/* <p>First Name:</p>
        <input type="text" name="First Name" placeholder="Enter First Name" />
        <br />
        <p>Last Name:</p>
        <input type="text" name="First Name" placeholder="Enter First Name" />
        <br />
        <p>User ID:</p>
        <input type="text" name="User Id" placeholder="Enter User Id" />
        <br />
        <p>Password:</p>
        <input type="password" name="Password" placeholder="Enter Your Password" />
        <br /> */}
        <Register />
        {/* /<div className="button" onClick={(e) => this.addregister(e)}> Register </div>/ */}

      </div>
    )
  }

  render() {
    if(this.state.is_valid_user){
      return(
        <div>
          <Customgrid/>
          </div>
      )
    }   

    if (this.state.addregisterclicked) {
      return (
          <Register handelregister={this.handelregister} />
      )
  }       

    let content = ''
    if (this.state.showLogin === true) {
      content = this.logincontent()
    }
    else {
      content = this.Signupcontent()
    }
    return (
      <div className="Apps">

        <div className="btn" onClick={(e) => this.switch(e)} id="login">Login</div>
        <div className="btn" onClick={(e) => this.switch(e) } id="signup">Signup</div>

        {content}

      </div>
    )
  }
}
export default Signup;


