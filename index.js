const express = require("express");
const jwt = require("jsonwebtoken");
const PORT = 3001;
const secretkey= "secretkey";

const app = express();

app.get("/",(req,res)=>{
    console.log("get post")
    res.json({
        message:"server is running on port"
    })
})

app.post("/login",(req,res)=>{
    const user={
        id:1,
        username:"meraj",
        email:"meraj@gmail.com"
    }
    jwt.sign({user},secretkey,{expiresIn:"300s"},(err,token)=>{
        res.json({
            token
        })
    })
})
app.post("/profile",verifyToken,(req,res)=>{
    jwt.verify(req.token,secretkey,(err,authData)=>{
        if(err){
            res.send({result:"invalid auth"})
        }
        else{
            res.json({
                massage:"profile valid",
                authData,
            })
        }
    })
})

function verifyToken(req,res,next){
   const bearerheader = req.headers['authorization']
   if(typeof bearerheader !=undefined){
     const bearer = bearerheader.split(" ");
     const token = bearer[1];
     req.token= token;
     next();
   }else{
    res.send({
        result:"Tocken is not defined!"
    })
   }

}

app.listen(PORT,()=>{
    console.log(`server is running on PORT: ${PORT}`)
})