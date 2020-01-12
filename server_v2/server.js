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

app.get("/submitted", function (req, res) {
	res.sendFile(__dirname + "/static/views/submitMessage.html")
})

let formInputs = {}
let formStructures = {}
let formFieldIndexes = {}

app.post("/pushfields", cors(), function (req, res) {
	const key = req.body.key
	formFieldIndexed[key] = 0
	formStructures[key] = req.body.structure
	formInputs[key] = {}
	res.json({text:"Successfuly pulled the fields."})
})

app.post("/getInput/:key", cors(), function(req, res) {
	res.json({
		stop: true,
		result: formInputs[key]
	});
})

dialogApp.intent("Key", function (conv, params) {
	const key = params.Key
	const lifespan = 25;
	const contextParameters = {
		key: key,
	};
	conv.contexts.set('key-context', lifespan, contextParameters);
	// console.log(key)
	const index = formFieldIndexes[key]++
	const structure = formStructures[key]
	conv.close(`Okay ${key} it is, ${structure[index]}?`)
})

dialogApp.intent("Name", function (conv, params) {
	const name = params.Name.name
	// console.log(name)
	const key_context = conv.contexts.get('key-context');
	const key = key_context.parameters;
	// console.log(key)
	formInputs[key]["Name"] = name
	const index = formFieldIndexes[key]++
	const structure = formStructures[key]
	if (index !== structure.length) {
		conv.close(`Okay ${name} it is, ${structure[index]}?`)
	} else {
		conv.close(`Okay ${name} it is, all inputs are recorded.`)
	}

})

dialogApp.intent("Address", function (conv, params) {
	const address = params.Address
	// console.log(address)
	const key_context = conv.contexts.get('key-context');
	const key = key_context.parameters;
	// console.log(key)
	formInputs[key]["Address"] = address
	const index = formFieldIndexes[key]++
	const structure = formStructures[key]
	if (index !== structure.length) {
		conv.close(`Okay ${address} it is, ${structure[index]}?`)
	} else {
		conv.close(`Okay ${address} it is, all inputs are recorded.`)
	}
})

dialogApp.intent("Phone Number", function (conv, params) {
	const phone_number = params.Phone_Number
	// console.log(phone_number)
	const key_context = conv.contexts.get('key-context');
	const key = key_context.parameters;
	// console.log(key)
	formInputs[key]["Phone_Number"] = phone_number
	if (index !== structure.length) {
		conv.close(`Okay ${phone_number} it is, ${structure[index]}?`)
	} else {
		conv.close(`Okay ${phone_number} it is, all inputs are recorded.`)
	}
})

dialogApp.intent("Gender", function (conv, params) {
	const gender = params.Gender
	// console.log(gender)
	const key_context = conv.contexts.get('key-context');
	const key = key_context.parameters;
	// console.log(key)
	formInputs[key]["Gender"] = gender
	const index = formFieldIndexes[key]++
	const structure = formStructures[key]
	if (index !== structure.length) {
		conv.close(`Okay ${gender} it is, ${structure[index]}?`)
	} else {
		conv.close(`Okay ${gender} it is, all inputs are recorded.`)
	}
})


dialogApp.intent("Country", function (conv, params) {
	const country = params.Country
	// console.log(country)
	const key_context = conv.contexts.get('key-context');
	const key = key_context.parameters;
	// console.log(key)
	formInputs[key]["Country"] = country
	if (index !== structure.length) {
		conv.close(`Okay ${country} it is, ${structure[index]}?`)
	} else {
		conv.close(`Okay ${country} it is, all inputs are recorded.`)
	}
})

app.post("/", dialogApp)

app.get("/fields/:key", function (req, res) {
	let key = req.params.key
	if (formInputs[key]) {
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
	delete formFieldIndexes[key]
	delete formStructures[key]
	res.redirect("/submitted")
})

app.get("*", function (req, res) {
	res.send("Sorry invalid request")
})

const server = app.listen(4444, function () {
	console.log("Server listening on port " + server.address().port)
})