var User=require("./Model/users")
var jwt=require("jsonwebtoken")

var auth=async(req, res, next)=>{
    try{
        var token=req.header("Authorization").replace('bearer ', '')
        var data=jwt.verify(token, "mykey123")
        var user=await User.findOne({_id:data._id})
        
        req.user=user

        next()
    }catch(err){
        res.json("not auth")
    }
}


module.exports={
    auth
}