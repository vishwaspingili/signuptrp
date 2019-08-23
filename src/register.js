import React, { Component } from 'react';
import './register.css';

class Register extends Component {
  constructor(props) {
    super(props)

  }
  
  
  backtologin(e){
    this.props.handelregister()

  }
  
  
  submit(e) {
    this.setState({
      username: "",
      showLogin: true
    })
    const Fname=document.getElementById("firstName").value;
    const Lname=document.getElementById("lastName").value;
    const mobile_number=document.getElementById("phone_number").value;
    const gmail=document.getElementById("userEmail").value;
      const home_address=document.getElementById("securityQuestion").value;
      const username=document.getElementById("user_id").value;
      const userpwd=document.getElementById("user_pwd").value
   
    fetch("http://172.16.75.112:8080/trp/register",{

      method: 'POST',
      headers: {
    
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
    
      },  body: JSON.stringify({
        
          first_Name: Fname,
         last_Name: Lname,
         phone: mobile_number,
         userEmail: gmail,
         securityQuestion: home_address,        
        user_Id: username,
        user_pwd:userpwd
    
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
                  errormessage:"Invalid data entered"
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
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )          
    }  
   render() {
    return (
      <div className="RegisterApp">           
<ul className="nav">
        <li>
        <p>  First name*
        <input type="text" name="Firs_tname" id= "firstname"/><br /></p>
        </li>
        <li>
        <p> Last name*
        <input type="text" name="Last_name" id= "lastName"/> <br /></p>
</li>
</ul>

        <ul className="nav">
        <li>

        <p>Phone
        <input type="text" name="Phone" id= "phone_number"/> <br /></p>
        </li>

        <li>
        <p>  Email*
        <input type="text" name="Email" id= "userEmail"/><br /></p>
        </li>
        </ul>

        <ul className="nav">
        <li>
        <p>securityQuestion
        <input type="text" name="SecurityQuestion" id= "securityQuestion"/> <br /></p>
        </li>

        <li>
        <p> user Id*
        <input type="text" name="Username" id= "user_id"/> <br /></p>
        </li>
        </ul>


        <ul className="nav">
          <li>
        <p> user Password*
        <input type="text" name="Userpwd" id= "user_pwd"/> <br /></p>
        </li>
        
        <li>
          <br/>
        <input type="submit" onClick={(e) => this.submit(e)} value="Register" />
       </li>
       </ul>
      </div>

    );
  }
}
export default Register;
