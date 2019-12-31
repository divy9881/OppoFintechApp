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

let formInputs = {}

app.post("/intents", function (req, res) {
    webhookResponse = req.body
    let action = webhookResponse.queryResult.action
    let len
    let key
    switch (action) {
        case "Name":
            len = webhookResponse.queryResult.outputContexts.length
            key = webhookResponse.queryResult.outputContexts[len-2]["parameters"]["Key"]
            formInputs[key] = {}
            formInputs[key]["Name"] = webhookResponse.queryResult.parameters["Name"].name
            return res.json({
                fulfillmentText: "Okay " + formInputs[key]["Name"] + " it is, \n Address?"
            })
        case "Address":
            len = webhookResponse.queryResult.outputContexts.length
            key = webhookResponse.queryResult.outputContexts[len-2]["parameters"]["Key"]
            let address = ""
            webhookResponse.queryResult.parameters["Address"].forEach(function (place) {
                address += place + " ,"
            })
            formInputs[key]["Address"] = address.slice(0, address.length - 1)
            return res.json({
                fulfillmentText: "Okay " + formInputs[key]["Address"] + "it is, \n Phone Number?"
            })
        case "Phone_Number":
            len = webhookResponse.queryResult.outputContexts.length
            key = webhookResponse.queryResult.outputContexts[len-2]["parameters"]["Key"]
            formInputs[key]["Phone_Number"] = webhookResponse.queryResult.parameters["Phone_Number"]
            return res.json({
                //fulfillmentText: "Okay " + formInputs[key]["Phone_Number"] + " it is, form ended, and all the inputs are recorded."
                fulfillmentText: "Okay " + formInputs[key]["Phone_Number"] + " it is, Gender?"
            })
        case "Gender":
            len = webhookResponse.queryResult.outputContexts.length
            key = webhookResponse.queryResult.outputContexts[len-2]["parameters"]["Key"]
            formInputs[key] = {}
            formInputs[key]["Gender"] = webhookResponse.queryResult.parameters["Gender"].name
            return res.json({
                fulfillmentText: "Okay " + formInputs[key]["Gender"] + " it is, \n Country?"
            })
        case "Country":
            len = webhookResponse.queryResult.outputContexts.length
            key = webhookResponse.queryResult.outputContexts[len-2]["parameters"]["Key"]
            formInputs[key] = {}
            formInputs[key]["Country"] = webhookResponse.queryResult.parameters["Country"].name
            return res.json({
                fulfillmentText: "Okay " + formInputs[key]["Country"] + " it is, form ended, and all the inputs are recorded."
            })
    }
})

app.get("/fields/:key", function (req, res) {
    let key = req.params.key
    if(formInputs[key]){
        res.json(formInputs[key])
    } 
    else {
        res.json({})
    }
})

app.post("/:key", function (req, res) {
    console.log(req.body)
    let key = req.params.key
    delete formInputs[key]
    res.redirect("/submitted")
})

app.get("*", function (req, res) {
    res.send("Sorry invalid request")
})

let server = app.listen(process.env.PORT, function () {
    console.log("Server listening on " + server.address().port)
})
