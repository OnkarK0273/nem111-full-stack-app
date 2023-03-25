const express = require("express");
const jwt = require('jsonwebtoken')
const NoteModal = require("../modal/note.modal");

const noteRoute = express.Router()

noteRoute.get('/',async(req,res)=>{
    const token = req.headers.token
    const decode =  jwt.verify(token, 'pass123')
    try{
        const notes = await NoteModal.find({ userID:decode.id })
        res.status(201).json({"notes":notes})

    }catch(err){
        res.status(401).json({"msg":"something went wrong"})
    }


})

noteRoute.post('/add',async(req,res)=>{

    try{
        const user = new NoteModal(req.body)
        await user.save()
        res.status(201).json({"msg":"Notes added"})

    }catch(err){
        res.status(401).json({"msg":"something went wrong"})
    }

})

noteRoute.patch(`/edit/:_id`,async(req,res)=>{
    
    try{
        const notes = await NoteModal.updateOne(req.params, { $set: req.body })
        res.status(201).json({"msg":"Note edited Sucessfully"})
       

    }catch(err){
        res.status(401).json({"msg":"something went wrong"})
    }

})



noteRoute.delete(`/delete/:_id`,async(req,res)=>{
    
    try{
        const del = await NoteModal.deleteOne(req.params)
        res.status(201).json({"msg":"Note deleted Sucessfully"})
       

    }catch(err){
        res.status(401).json({"msg":"something went wrong"})
    }

})

module.exports = noteRoute