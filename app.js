var restify=require("restify")
var db=require("./db")

var app=restify.createServer()
app.use(restify.plugins.bodyParser())

db.on('err', (err)=>{
    console.log(err)
})


db.once('open', ()=>{
    require('./routers/customers')(app)
    require('./routers/user')(app)

})

app.listen(3000)