var restifyerror=require('restify-errors')
var users=require('../Model/users')
var bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken')

module.exports=app=>{
    app.post("/register", async(req, res, next)=>{
        try{
            bcrypt.hash(req.body.password,10, (err, hash)=>{
                if(err){
                    res.send(404)
                    return next(new restifyerror.BadDigestError(err))
                }else{
                    var User=new users({
                        email:req.body.email,
                        password:hash
                    })
        
                    User.save()
                    .then(doc=>{
                        res.json(doc)
                        res.send(201)
                    })
                }
            })
            
            next()
        }catch(err){
            return next(new restifyerror.InternalError(err.message))
        }
    })


    app.post("/auth", async(req, res, next)=>{
        try{
            await users.find({email:req.body.email})
            .exec()
            .then(doc=>{
                if(bcrypt.compareSync(req.body.password, doc[0].password)){
                    var token=jwt.sign({_id:doc[0]._id}, "mykey123", {expiresIn:'15m'})

                    const {iat, exp}=jwt.decode(token)
                    res.json({iat, exp, token})
                }else{
                    return next(new restifyerror.NotAuthorizedError(doc))
                }
            })
            next()
        }catch(err){
            return next(new restifyerror.UnauthorizedError(err))
        }
    })

   
}