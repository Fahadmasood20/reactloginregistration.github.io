import React, { useState } from "react"
import "./Registration.css"
import axios from "axios"
// import path from "path";
import { useNavigate } from "react-router-dom";
//  import InputAdornment from "@material-ui/core/InputAdornment";
import validator from 'validator'

const Registration = () => {


    const [emailError, setEmailError] = useState('')
  const validate = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError(true)
    } else {
      setEmailError('Enter valid Email!')
      
    }
  }
  // PASSWORD
  const [errorMessage, setErrorMessage] = useState('')
  
  const validatepas = (e) => {
  
    var password = e.target.value

    if (validator.isStrongPassword(password, {
      minLength: 8, 
       minNumbers: 1,
    })) {
      setErrorMessage('')
    } else {
      setErrorMessage(' Not Strong Password')
    }
  }

// phone

 const [errorphone, setErrorphone] = useState('')
  
   const validateor = (e) => {
    

    if (e.target.value.length <11) {
      setErrorphone(true);
    }else{
      setErrorphone("inter valid number");
    }
    } 
  

  // if (e.target.value.length > 10) {
  //   setIsError(true);
  // }
// +++++++++++++++++++++++++++++++++++++++++
 const [errorAddress, setErrorAddress] = useState('')
  
   const validateaddress = (e) => {
  
     if (e.target.value.length < 25) {
      setErrorAddress(true);
}else{
  setErrorAddress("inter valid address");
}
} 
// ++++++++++++++++++++++++++
const [errorCitys, setErrorCity] = useState('')
  
   const validatecity = (e) => {
  
     if (e.target.value.length < 10) {
      setErrorCity(true);
}else{
  setErrorCity("inter valid city name");
}
} 
// +++++++++++++++++++++++++


    const navigate = useNavigate();

    

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: "",
        phone:"",
        address:"",
        city:"",
        
        
        profile: 
  {
    path: { type: String },
    name: { type: String },
  
  },
       
    })

    
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
   
    const imageUpload=(e)=>{
        
        console.log({...user,profile:e.target.files[0]})
        setUser({...user,profile:e.target.files[0]})

        
    }
    

    const Registration = () => {
    
        const { city,address, phone,name, email, password, reEnterPassword,} = user
        if(   city&&address&& phone&& name && email && password && (password === reEnterPassword)){
               console.log("===",user.profile,"===",user.profile.name) 
            const formdata = new FormData();

            formdata.append("profile",user.profile )
            formdata.append("name",user.name )
          
            formdata.append("email",user.email )
            formdata.append("phone",user.phone )
            formdata.append("address",user.address )
            formdata.append("city",user.city )
            formdata.append("password",user.password )
             
            axios.post("http://localhost:9002/registration", formdata,user)
            .then( res => {
                alert(res.data.message,"register")
                console.log(res.data.message,"register")
                // alert(user.data.message,"register")
                navigate("/")
            })
        } else {
            alert(" check the password")
        }
        
    }
    
    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
        
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange } ></input>
            <input type="text"  name="email" value={user.email}     onKeyUp={(e) => validate(e)} placeholder="Your Email" className="email" onChange={ handleChange }></input>
            <span style={{
                fontWeight: 'bold',
                color: 'red',
              }}>{emailError}</span>
            <input type="password" name="password" onKeyUp={(e) => validatepas(e)}   value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
             <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{errorMessage}</span>
            
        <input type="password"  name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
        
            <input type="number" name="phone"  onKeyUp={(e) => validateor(e)}  value={user.phone} placeholder="please inter the number" onChange={ handleChange }></input>
            <span style={{
              fontWeight: 'bold',
              color: 'red',
            }}>{errorphone}</span>

           



             <input type="textarea"   onKeyUp={(e) => validateaddress(e)}    name="address" value={user.address} placeholder="please inter the address" onChange={ handleChange }></input>
     
             <span style={{
              fontWeight: 'bold',
              color: 'red',
            }}>{errorAddress}</span>





             <input type="text" name="city"    onKeyUp={(e) => validatecity(e)}      value={user.city} placeholder="please inter the city" onChange={ handleChange }></input>
             <span style={{
              fontWeight: 'bold',
              color: 'red',
            }}>{errorCitys}</span>



             <input type="file" name="image"  className="form-control" value={user.image} autoComplete="off" onChange={imageUpload}/>




            <div className="button" onClick={Registration} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/Login")}>Login</div>
        </div>
    )
}




export default Registration;