const express = require("express")
const HttpEroor =require("./models/http-errors")
const bodyParser = require("body-parser")
const user = require("./routes/userRoute")
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express()
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
app.use(bodyParser.json())
app.use(cookieParser());



app.use('/user',user)
app.use((req ,res ,next )=>{

    const eroor= new HttpEroor("link not fande ",404)
    throw eroor
})

app.use((error , req ,res ,next )=>{

    if (res.headerSent) {
        return next(error)
        
    }
    res.status(error.code || 500)
    res.json({message:error.message || 'unknown eroor'})
})

app.listen(process.env.PORT)
