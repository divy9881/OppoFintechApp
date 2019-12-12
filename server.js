let express = require("express")
let bodyParser = require("body-parser")

let app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    console.log("GET request accepted.")
    res.send("Oppo fintech app running ....")
})

app.post("/", function(req, res){
    console.log(req.body.parameters)
    return res.json({
        fulfillmentText: "Hiii!"
    })
    // return res.json({
    //     speech:"I got " + req.body.parameters,
    //     displayText : "I got " + req.body.parameters,
    //     source: "Name info"
    // })
})

let server = app.listen(process.env.PORT, function(){
    console.log("Server listening at " + server.address().address + " and on " + server.address().port)
})
