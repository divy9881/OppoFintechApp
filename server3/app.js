const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { dialogflow } = require('actions-on-google');

const app = express()

const dialogApp = dialogflow({
    // debug: true
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(__dirname + "/static"))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/static/views/form.html")
})

app.get("/test", function (_req, res) {
    res.sendFile(__dirname + "/test.html")
})

let formFields = {}
let formValues = {}

app.post("/pushfields", cors(), function (req, res) {
    const key = req.body.key
    formFields[key] = req.body.fields
    formValues[key] = []
    res.json({ text: "Successfuly pulled the fields." })
})

app.post("/getInput/:key", cors(), function (req, res) {
    const key = req.params.key
    if (key) {
        if(formFields[key].length === formValues[key].length) {
            res.json({
                stop: true,
                fields: formFields[key],
                values: formValues[key]
            });
        } else {
            res.json({
                stop: false
            })
        }
    } else {
        req.json({ stop: true, result: [] })
    }
})

function followup(conv, key) {
    let index = formValues[key].length
    if(index === formFields[key].length) {
        conv.followup("EVENT_END")
    } else {
        conv.followup("EVENT_INPUT", { Field: formFields[key][index] })
    }
}

dialogApp.intent("Key", function (conv, params) {
    const key = params.Key
    const lifespan = 25;
    const contextParameters = {
        key: key,
    };
    conv.contexts.set('Key-followup', lifespan, contextParameters);
    followup(conv, key)
});

dialogApp.intent("InputEntered", function (conv, params) {
    const value = params.Value
    const key = params.Key
    formValues[key].push(value)
    const lifespan = 25;
    const contextParameters = {
        key: key,
    };
    conv.contexts.set('Key-followup', lifespan, contextParameters);
    followup(conv, key)
});

app.post("/", dialogApp)

app.get("*", function (req, res) {
    res.send("Sorry invalid request")
})

app.listen(process.env.PORT, function () {
    console.log("Server started")
})