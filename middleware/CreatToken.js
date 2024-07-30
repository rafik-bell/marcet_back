const jwt =require('jsonwebtoken')

function CreatToken(req ,res,next) {
  
    const user ={username:req.body.username}
 jwt.sign(user, process.env.JWT_SECRET ,(err,rusalt)=>{
   if (err) {
    res.json({error:err})
   } else {
    req.token = rusalt
    next()
   }

 }
 )

}
module.exports=CreatToken
















