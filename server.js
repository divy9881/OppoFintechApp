let express = require("express")
let bodyParser = require("body-parser")

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(__dirname + "/static"))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/static/views/form.html")
})

app.get("/submitted", function (req, res) {
    res.sendFile(__dirname + "/static/views/submitMessage.html")
})

app.post("/", function (req, res) {
    console.log(req.body)
    res.redirect("/submitted")
})

let formInputs = {}

app.get("/fields", function (req, res) {
    res.json(formInputs)
})

app.post("/intents", function (req, res) {
    webhookResponse = req.body
    let action = webhookResponse.queryResult.action
    switch (action) {
        case "Name":
            let length = webhookResponse.queryResult.outputContexts.length
            let key = webhookResponse.queryResult.outputContexts[length-1]["Key"]
            formInputs[key]["Name"] = webhookResponse.queryResult.parameters["Name"].name
            return res.json({
                fulfillmentText: "Okay " + formInputs[key]["Name"] + " it is, \n Address?"
            })
        case "Address1":
            let length = webhookResponse.queryResult.outputContexts.length
            let key = webhookResponse.queryResult.outputContexts[length-1]["Key"]
            let address = ""
            webhookResponse.queryResult.parameters["Address"].forEach(function (place) {
                address += place + ","
            })
            formInputs[key]["Address"] = address.slice(0, address.length - 1)
            return res.json({
                fulfillmentText: "Okay " + formInputs[key]["Address"] + " it is, \n Phone Number?"
            })
        case "Phone_Number1":
            let length = webhookResponse.queryResult.outputContexts.length
            let key = webhookResponse.queryResult.outputContexts[length-1]["Key"]
            formInputs[key]["Phone_Number"] = webhookResponse.queryResult.parameters["Phone_Number"]
            return res.json({
                fulfillmentText: "Okay " + formInputs[key]["Phone_Number"] + " it is, \nform ended, and all the inputs are recorded."
            })
    }
})

app.get("*", function (req, res) {
    res.send("Sorry invalid request")
})

let server = app.listen(process.env.PORT, function () {
    console.log("Server listening on " + server.address().port)
})
