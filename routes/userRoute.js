const express = require("express")
const route = express.Router()
const userController =require("../controllers/user-controller")


route.post('/login',userController.login)
route.get('/user',userController.user)
route.post('/logout',userController.logout)


module.exports =route;