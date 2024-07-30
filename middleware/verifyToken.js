const jwt =require('jsonwebtoken')
const HttpEroor =require('../models/http-errors')
const secretKey = "1234567"
function verifyToken(req ,res,next) {
    const bearerHeader =req.headers['authorization']
   
    if (typeof bearerHeader!=="undefined") {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        
        jwt.verify(bearerToken,secretKey,(err,data)=>{
            if (err) {
                const eroor= new HttpEroor("user not vitivide",403)
    throw eroor
            } else {

                req.token = data
            }
        })
        next()
        
    } else {
        const eroor= new HttpEroor("no heder ",403)
    throw eroor
        
    }
 
  
}
module.exports=verifyToken
















