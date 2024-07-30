const HttpEroor =require("../models/http-errors")
const mysql = require('mysql');
const jwt =require("../middleware/jwt")
require('dotenv').config();
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database:  process.env.DB_NAME,
});

con.connect(function(err) {
  if (err) {
    const eroor= new HttpEroor("database not conected ",404)
    throw eroor
}
  console.log("Connected!");
 
});


const login = (req,res,next)=>{
  const { username, password } = req.body;
 
if (username ==="" ||password ==="") {
  
 
  

if (username ==="") {
  res.json({massege:'email is empty'})
}
if (password ==="") {
  res.json({massege:'password is empty'})
}
}else {
  con.query("SELECT * FROM user WHERE user_name = ? AND password = ?", [username, password], function (err, result, fields) {
    if (err) throw err;

    if (result.length > 0) {
      
    
    token=jwt.generateToken(result)
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
  })
    res.json({username})
  }else{
    
    res.json({massege:'email or password filde'})
      
   

  }
  
    ;})
    
    
  }
}




const user = (req,res,next)=>{
  const cookie = req.cookies['jwt']
  
 
  if (!cookie) {
    return res.status(401).send({
      message: 'unauthenticated'
  })
  }
  token =jwt.verifyToken(cookie)
  console.log(token);
  if (!token) {
    return res.status(401).send({
        message: 'unauthenticated'
    })
}
con.query("SELECT * FROM user ", function (err, result, fields) {
  if (err) throw err;

  if (result.length > 0) {
    res.json({result})
    
}
;})
}

const logout = (req,res,next)=>{
  res.cookie('jwt', '', {maxAge: 0})

  res.send({
      message: 'success'
  })
}


exports.login= login
exports.user =user
exports.logout=logout