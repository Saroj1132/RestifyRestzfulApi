var restifyerror=require("restify-errors")
var customer=require("../Model/customers")
var auth=require("../auth")

module.exports = app => {
    
    app.get("/customers", auth.auth, async (req, res, next)=>{
        try{
            await customer.find()
            .then(doc=>{
                res.json({customer:doc})
            })
            next()
        }catch(err){
            return next(new restifyerror.InvalidContentError(err))
        }
    })

    app.post("/customers",auth.auth, async(req, res, next)=>{
        try{
            var Customers=new customer({
                userid:req.user._id,
                name:req.body.name,
                email:req.body.email,
                balance:req.body.balance
            })
            await Customers.save()
            .then(doc=>{
                res.json({"list of customers":doc})
                res.send(201)
            })
            next()
        }catch(err){
            return next(new restifyerror.InternalError(err))
        }
    })

    app.get("/customers/:id",auth.auth, async(req, res, next)=>{
        var query={_id:req.params.id}
        try{
            await customer.findById(query)
            .then(doc=>{
                res.json(doc)
                res.send(201)
            })
            next()
        }catch(err){
            return next(new restifyerror.ResourceNotFoundError(`there is no customer of ${req.params.id}`))
        }
    })

    app.del("/customers/:id",auth.auth, async(req, res, next)=>{
        var query={_id:req.params.id}
        try{
            await customer.deleteOne(query)
            .then(doc=>{
                res.json(doc)
                res.send(201)
            })
            next()
        }catch(err){
            return next(new restifyerror.ResourceNotFoundError(`there is no customer of ${req.params.id}`))
        }
    })

    app.put("/customers/:id", async(req, res, next)=>{
        try{
            await customer.findByIdAndUpdate({
                _id:req.params.id
            }, req.body)
            .then(doc=>{
                res.json(doc)
                res.send(200)
            })
            next()
        }catch(err){
            return next(new restifyerror.ResourceNotFoundError(err))
        }
    })

}

