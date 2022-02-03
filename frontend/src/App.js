import { useState } from "react";
import "./App.css";
import { BrowserRouter , Routes, Route  } from "react-router-dom";
import Login from "./Component/login/Login";
import Registration from "./Component/ragistration/Registration";
import Home from "./Component/Homepage/Home"

function App() {
  const [user, setLoginUser] = useState({
    
  });
  console.log()
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={user && user._id ?<Home setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
      } 
       /> 
        <Route path="/Login" element={<Login setLoginUser={setLoginUser} />}
        
    
        />
        <Route path="/Home" element={<Home/>} />
        <Route path="/" element={<Login />} />
      <Route path="/Registration" element={<Registration />} />
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;


