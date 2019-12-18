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
    // console.log(webhookResponse)
    let action = webhookResponse.queryResult.action
    // console.log(action)
    let len
    let key
    switch (action) {
        case "Name":
            len = webhookResponse.queryResult.outputContexts.length
            // console.log(len)
            console.log(webhookResponse.queryResult.outputContexts[len-1]["parameters"])
            key = webhookResponse.queryResult.outputContexts[len-1]["parameters"]["Key"]
            console.log(key)
            formInputs[key]["Name"] = webhookResponse.queryResult.parameters["Name"].name
            return res.json({
                fulfillmentText: "Okay " + formInputs[key]["Name"] + " it is, \n Address?"
            })
        case "Address":
            len = webhookResponse.queryResult.outputContexts.length
            key = webhookResponse.queryResult.outputContexts[len-1]["parameters"]["Key"]
            let address = ""
            webhookResponse.queryResult.parameters["Address"].forEach(function (place) {
                address += place + ","
            })
            formInputs[key]["Address"] = address.slice(0, address.length - 1)
            return res.json({
                fulfillmentText: "Okay " + formInputs[key]["Address"] + " it is, \n Phone Number?"
            })
        case "Phone_Number":
            len = webhookResponse.queryResult.outputContexts.length
            key = webhookResponse.queryResult.outputContexts[len-1]["parameters"]["Key"]
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
