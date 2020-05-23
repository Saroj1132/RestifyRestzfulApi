var mongosoe=require("mongoose")
var url="mongodb+srv://RestifyRestApI:Saroj123@cluster0-b58r8.mongodb.net/test?retryWrites=true&w=majority"

mongosoe.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})

var db=mongosoe.connection

module.exports=db