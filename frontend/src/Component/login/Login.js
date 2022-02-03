import React, {useState,useEffect} from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import axios from "axios"
import { useCookies } from "react-cookie";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { environment } from "../environment";
import validator from 'validator'


const Login = () => {
  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('')
    } else {
      setEmailError('Enter valid Email!')
    }
  }

    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cookies, setCookie] = useCookies(["data"]);
    const navigate = useNavigate();
    let obj = { email, password };
  
    
  useEffect(() => {
  
    const loggedInUser = cookies.data;

    if (loggedInUser) {
        navigate("/Home");
      console.log(loggedInUser);
    }

   
  }, []);
    
// ++++++++++++++++++++++++++



    

      let handleSubmit = (e) => {
        e.preventDefault();
    
        axios({
          url: environment.apiUrl + "/login",
          method: "POST",
          data: obj,
        })
          .then((response) => {
            // debugger;A
            console.log(response.data);
            const Data = response.data;
            
            const Res = response.data.message;
            console.log(Data);
            toast.warn(Res)
             if (Res === "success") {
              toast.success("success")
               const token = response.data.token;
               localStorage.setItem("token", token);
              let today = new Date();
              var tomorrow = new Date();
              tomorrow.setDate(today.getDate() + 1);
              setCookie("data", Data, { expires: tomorrow });
              
              navigate("/Home");
            }
            else{
              alert("");
            }
           
          })
          .catch((err) => console.log(err));
      };
 

    return (
        <div className="login bg-light">
            <h1>Login</h1>
            <input type="text" name="email"  onKeyUp={(e) => validateEmail(e)} required onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email"></input>
            <input type="password" name="password" required  onChange={(e) => setPassword(e.target.value)}  placeholder="Enter your Password" ></input>
            <div className="button bg-dark" onClick={handleSubmit}>Login</div>
            <div>or</div>
            <div className="button bg-dark Register" onClick={() => navigate("/Registration")}>Register</div>
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
        </div>
        
    )
}

export default Login

