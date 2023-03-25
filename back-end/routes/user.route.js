const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModal = require("../modal/user.modal");

const userRoute = express.Router();

userRoute.post("/sign", async (req, res) => {
  const {name,email,pass,age} = req.body
  try {
    const isReg = await UserModal.findOne({email})
    if(isReg){
      return res.status(400).json({ msg: "User Allready Exist" });
    }
    bcrypt.hash(pass, 5, async(err, hash)=>{
      // Store hash in your password DB.
      const user = new UserModal({name,email,pass:hash,age})
      await user.save();
      res.status(200).json({ msg: "signup sucessfull" }); 
    })

  } catch (err) {
    res.status(400).json({ msg: "signup failed" });
  }
});

userRoute.post("/login", async (req, res) => {
    const {email,pass} = req.body
  try {
    const user = await UserModal.findOne({email})
    if(!user){
       return res.status(400).json({ msg: "user not registred" });
    }

    bcrypt.compare(pass, user.pass, (err, result)=>{

      if(result){
       return res.status(200).json({ "msg": "login sucessfull",token:jwt.sign({ id: user._id }, 'pass123'),user:user })
      }else{
        return  res.status(400).json({ "msg": "password is wrong" });
      }
      
    });

  } catch (err) {
    res.status(400).json({ "msg": "login failed" });
  }
});


userRoute.get('/users',async(req,res)=>{

    try{
      const users = await UserModal.find()
      res.status(201).json({"users":users})

    }catch(err){
      res.status(401).json({"msg":"something went wrong"})
    }


})



module.exports = userRoute;
