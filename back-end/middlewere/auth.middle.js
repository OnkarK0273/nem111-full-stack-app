const jwt = require('jsonwebtoken')

const authMiddle = (req,res,next)=>{
    const token = req.headers.token
    if(token){
        const decode =  jwt.verify(token, 'pass123')
        console.log(decode)
        if(decode){
            req.body.userID = decode.id
            next()
        }else{
           return res.status(401).json({"msg":"please login first"})
        }
    }else{
        return  res.status(401).json({"msg":"please login first"})
    }
}

module.exports = authMiddle