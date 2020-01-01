let express = require("express")
let bodyParser = require("body-parser")

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.use(express.static(__dirname + "/static"))


let server = app.listen(process.env.PORT, function () {
    console.log("Server listening on " + server.address().port)
})
