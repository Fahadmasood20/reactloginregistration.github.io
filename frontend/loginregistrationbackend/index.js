
//  const express = require('express')
import express from "express";
//  import router from 'router';
 const router = express.Router();
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import validator from 'validator';
// import validate from "validate"
// var verifyToken = import('./JWT/auth');
// import { verifyToken  } from './JWT/auth'
 import  'phone-number-validation';
// import phonevalidator from 'phone';

import  emailvalidator from "email-validator"




import {} from 'dotenv/config';
import {} from "auth"
import { error } from "console";
  // import {verifyToken} from "../JWT/auth.js";

  import validatePhoneNumber from 'validate-phone-number-node-js';

  

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(cookieParser())
app.use("/public", express.static("public"));
app.use("/jwt", express.static("jwt"));
app.use("/dotenv/config", express.static("dotenv/config"));
 const auth = express();
app.use("./auth", express.static("./auth"));


// const verifyToken = express();
// app.use("/JWT/auth", express.static("./JWT/auth"));
// console.log(verifyToken)


const maxSize = 3* 1024*  1024; 
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'public/images/')
   },
   filename: function(req, file, cb) {
       // console.log(file)
       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
   }
 }); 
 
 var upload = multer({ storage: storage ,
   limits:{fileSize:1024*1024*5
   }
   })
mongoose.connect( "mongodb+srv://fahad:Fahadmasood12345@cluster0.yfp6i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
  useNewUrlParser:true,
  useUnifiedTopology:true
  
}, (err)=>{ 
  if(err)
  console.log(err)
  else{
      console.log("Successfully connected to the database")
  }
})

const userSchema = new mongoose.Schema({
     name: String,
    email: {
      type:String,
    
    unique:true,
    
    },
    
   password: String,
    phone:{
type:Number,
require:true,
    },
    address:String,
    city:String,
  profile: 
  {
    path: { type: String },
    originalname: { type: String }  
  },
       token: { type: String },

  
   
})
// +++++++++++++++++++++


// +++++++++++++++++++++++++




userSchema.pre('save', async function (next) {
  // console.log('just before saving')

  const rounds = 10; // What you want number for round paasword

  const hash = await bcrypt.hash(this.password, rounds);
  this.password = hash;
  next()
})




const User = new mongoose.model("User", userSchema)


// ++++++++++++++++++++++++++++++


app.get("/findall", function (req, res) {
  //use get for find all

  User.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(data.email);
    }
  });
});
app.get("/findallData", (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/getallUser", (req, res) => {
  User.find().then((data) => res.send(data));
});

app.post("/paginationData", (req, res) => {
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size);
  var query = {};
  if (pageNo < 0 || pageNo === 0) {
    data = { error: true, message: "invalid page number, should start with 1" };
    return res.send(data);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;

  User.find({}, {}, query)

    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/serchPhoneNumber/:key", (req, res) => {
  console.log(req.params.key);
  // console.log(req.query);
  User.find({
    $or: [
      { email: { $regex: req.params.key } },
      { name: { $regex: req.params.key } },
      //   { phone: { $regex: req.params.key } },
    ],
  }).then((data) => {
    res.send(data);
  });
});

app.delete("/Delet", (req, res) => {
  const { name, email, phone, addres, password } = req.body;
  User.findOneAndRemove({ User: email, User: name }, (err, User) => {
    if (!err) {
      console.log(User);
    }
  });
});

app.patch("/UpdateUserData", (req, res) => {
  console.log(req.params);
  console.log(req.body);

  User.findOneAndUpdate(
    { email: req.body.email },
    { email: req.body.email },
    {
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("user data is updated");
      }
    }
  );
});

app.put("/UpdateUserData", (req, res)=> {
  console.log(req.params)
  console.log(req.body)
 
User.findOneAndUpdate({email:req.body.email},{name:req.body.Name,phone:req.body.Phone,addres:req.body.address},
{
    useFindAndModify:false
},(err) =>{
  if(err){
      console.log(err)
      
  }else{

res.send("user data is updated")
  }
})

}) 
// ++++++++++++++++++++++++++++++++++++++++
app.post("/Registration", upload.single('profile'), (req, res) => {
 

 
 



  const {name, email,  password ,phone,address,city} = req.body
  
  
 
 
  const profile = {

    originalname: req.file.originalname,
    path: req.file.path
  };
  
  
  

  User.findOne({ email: email }, (err, user) => {


   
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
if(emailvalidator.validate(req.body.email)){
  // Your call to model here
}else{
return  res.send({ message: "email is envalid"}); 
}
// ++++++++++++++++++++++++++++++++++++

 if(validatePhoneNumber.validate(req.body.phone)){
//   // Your call to model here
 }else{
 return  res.send({ message: "phone number is envalid"}); 
 }



    if (user) {
      return  res.send({ message: "User already registerd"}); 
    
      
    } 
    

    
   


    
    else {
      const user = new User({
        name,
        email,
        password,
        phone,
         address,
         city,
         profile,
      })
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1hours",
        }
      );
      user.token = token;

      user.save((err) => {
        if (err)
          res.json({
            message: { msgBody: err, msgError: "true", },
          });
        else {
          res.json({
            message: { msgBody: "Successfully Created ", msgError: false },
          });
        }
      });




    }
  })

})
     
// This should be the last route else any after it won't work

// +++++++++++++++++++++++++++++++++++++++++++=+


// +++++++++++++++++++++++++

// +++++++++++++++++++++++++++++



app.post('/login', (req, res) => {
  const { email, password } = req.body
console.log(req.body.email)
if (!email){
          return res.send({ message: "Please Enter Email" })
}
if (!password){
  return res.send({ message: "Please Enter Password" })
}

  try {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if (!user)
          return res.send({ message: "User not registered" })
          

        bcrypt.compare(password, user.password, (err, user) => {



          if (user) {
            const token = jwt.sign({ _id: user._id, email }, "secret", {
              expiresIn: "1h",
            });
            return res.json({ message: "success", Data: user, token: token });
          } else {
            return res.json({ message: "wrong password" });
           
            
          }
        })
      })
  }
  catch (e) { console.log(e) }
})
// +++++++++++++++++++++++

// app.post("/welcome", verifyToken, (req, res) => {
//    console.log(res)
 
// res.status(200).send("Welcome 🙌 ");
// // res.status(400).send("wrong")
// });

app.post("/welcom", auth, (req, res) => {
  res.status(200).send("Welcom 🙌 ");
 });
// ++++++++++++++++++++++++++++++++++++++++++++
app.listen(9002, () => {
  console.log("BE started at port 9002");
});
