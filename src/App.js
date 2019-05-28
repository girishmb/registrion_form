import React, { Component } from "react";
import axios from 'axios';
import './App.css';
import './css/custom.css';

const emailRegex = RegExp(/[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/);

const checkvalidityFORM = ({formErrs, ...rest }) =>{
      let valid = true;
      
  

      Object.values(rest).forEach(val =>{
        if(val ==null){
          valid = false;
        }
      });

      return valid;
    };

class App extends Component{
  constructor(props){
    super(props);

    this.state={
      firstname: null,
      lastname: null,
      npi: null,
      businessaddress: null,
      telephonenumber: null,
      email: null,
      password: null,
      formErrs: {
        firstname: "",
        lastname: "",
        npi: "",
        businessaddress: "",
        telephonenumber: "",
        email: "",
        password: ""
      }
    }

  }
   handleSubmit  =e => {
        e.preventDefault();

        if(checkvalidityFORM(this.state.formErrs)){
          console.log('Capturing the data--  ' );
          console.log(this.state);
          axios.post('RESTURI', this.state).then(response =>{console.log(response)})
          
        }else{
          console.error('Invalid - Please check for any errors');
        }
      };
  
      handleChange  =e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrs = this.state.formErrs;

        switch(name){
          case 'firstname':
            formErrs.firstname =  value.length < 3 ? 'Please enter atleast 3 Characters':'';
            break;
            case 'lastname':
            formErrs.lastname =  value.length < 2  ? 'Please enter atleast 2 Characters':'';
            break;
            case 'npi':
            formErrs.npi =  value.length < 5  ? 'Please enter atleast 5 Characters':'';
            break;
            case 'businessaddress':
            formErrs.businessaddress =  value.length < 15  ? 'Please enter atleast 15 Characters':'';
            break;
            case 'telephonenumber':
            formErrs.telephonenumber =  value.length < 10  ? 'Please enter atleast 10 Characters':'';
            break;
            case 'email':
            formErrs.email = emailRegex.test(value)  ? '':'Please enter a valid Email Address';
            break;
            case 'password':
            formErrs.password =  value.length < 8   ? 'Please enter atleast 8 Characters':'';
            break;
            default:
            break;
        }

        this.setState({formErrs, [name]: value}, () => console.log(this.state));
      };

  render(){ 
    const {formErrs} = this.state;

    return(
      <table width='100%'>
      <tr>
      <th>
      <div className="rgform">
        <div className="">
          <h1>Availity Registration Form</h1>
          <form  onSubmit={this.handleSubmit} noValidate>
          <div className="">
              <label htmlFor="firstname"></label>
              <input  type="text" className="InputNameStyle" placeholder="Enter First Name" name="firstname" noValidate onChange={this.handleChange} />
            </div>
            {formErrs.firstname.length > 0 && (<span className="errorMessage">{formErrs.firstname}</span>)
            }
            <div className="">
              <label htmlFor="lastname"></label>
              <input type="text" className="InputNameStyle" placeholder="Enter Last Name"  name="lastname" noValidate onChange={this.handleChange} />
            </div>
            {formErrs.lastname.length > 0 && (<span className="errorMessage">{formErrs.lastname}</span>)
            }
            <div className="">
              <label htmlFor="npi"></label>
              <input type="text" className="InputNameStyle" placeholder="Enter NPI Number"  name="npi" noValidate onChange={this.handleChange} />
            </div>
            {formErrs.npi.length > 0 && (<span className="errorMessage">{formErrs.npi}</span>)
            }
            <div className="">
              <label htmlFor="businessaddress">
             
              <textarea className="InputBusAddress" id="businessaddress" name="businessaddress" placeholder="Enter Business Address" onChange={this.handleChange}></textarea>
              </label>
            </div>
            {formErrs.businessaddress.length > 0 && (<span className="errorMessage">{formErrs.businessaddress}</span>)
            }
            <div className="">
              <label htmlFor="telephonenumber"></label>
              <input type="text" className="InputNameStyle" placeholder="Enter Telephone Number"  name="telephonenumber" noValidate onChange={this.handleChange} />
            </div>
            {formErrs.telephonenumber.length > 0 && (<span className="errorMessage">{formErrs.telephonenumber}</span>)
            }
            <div className="">
              <label htmlFor="email"></label>
              <input type="email" className="InputNameStyle" placeholder="Enter Email Address"  name="email" noValidate onChange={this.handleChange} />
            </div>
            {formErrs.email.length > 0 && (<span className="errorMessage">{formErrs.email}</span>)
            }
            <div className="">
              <label htmlFor="password"></label>
              <input type="password" className="InputNameStyle" placeholder="Enter Password"  name="password" noValidate onChange={this.handleChange} />
            </div>
            
            {formErrs.password.length > 0 && (<span className="errorMessage">{formErrs.password}</span>)
            }
            
            <div className="container">
              <button className="btn" type="submit">Register</button> 
              
            </div>
          </form>

          </div>
      </div>
      </th>
      <th>
      <div className="signin">
      <h2>Already registered?</h2>
      <h1> Sign In</h1>
      <form  onSubmit={this.handleSubmit} noValidate>
          <div className="">
              <label htmlFor="emailAdress1"></label>
              <input  type="text" className="InputNameStyle" placeholder="Enter Email Address" name="emailaddress1" noValidate onChange={this.handleChange} />
            </div>
            <div className="">
              <label htmlFor="password1"></label>
              <input type="password" className="InputNameStyle" placeholder="Enter Password"  name="password1" noValidate onChange={this.handleChange} />
            </div>
            
            <div className="container">
              <button className="btn" type="submit1">Sign In</button> 
              
            </div>
            
      </form>
      </div>
      </th>
      </tr>
      </table>
    );
  }

}
export default App;
