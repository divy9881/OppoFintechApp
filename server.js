let express = require("express")

let app = express()

app.get("/", function(req, res){
    res.send("Oppo fintech app running ....")
})

server = app.listen(port, function(){
    console.log("Server listening at " + server.address().address + " and on " + server.address().port)
})
