let labelToElement = {};
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'get') {
        var textAreas = $.find("textarea");
        var inputs = $.find("input");
        var labels = $.find("label");
        // <label> tag is for <button>, <input>, <meter>, <output>, <progress>, <select>, or <textarea> element. We consider only <input> and <textarea>

        // First we consider labels. Then we consider 'name' attribute
        // ignore hidden form elements

        // console.log("textAreas", textAreas);
        // console.log("inputs", inputs);
        // console.log("labels", labels);

        /* ALL INPUT TYPES: button, checkbox, color, date, datetime-local, email, file, hidden,
        image, month, number, password, radio, range, reset, search, submit, tel, text, time, url, week, */
        let consideredTypes = ["date", "email", "number", "search", "tel", "text", "time"];
        let unsureTypes = ["color", "datetime-local", "month", "number", "password", "search", "tel", "text", "time", "url", "week"];

        let consideredInputs = textAreas;
        let unsureInputs = [];
        let ignoredInputs = [];

        for (var i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let inputType = input.attributes.type.value;
            if (consideredTypes.includes(inputType)) {
                consideredInputs.push(input);
            } else if (unsureTypes.includes(inputType)) {
                unsureInputs.push(input);
            } else {
                ignoredInputs.push(input);
            }
        }
        // console.log("consideredInputs", consideredInputs)
        // console.log("unsureInputs", unsureInputs)
        // console.log("ignoredInputs", ignoredInputs)


        labelToElement = {};
        // Label -> forElement

        labels.forEach(label => {
            if (label.attributes.for) {
                let forElementId = label.attributes.for.value;
                let element = document.getElementById(forElementId)
                if (consideredInputs.includes(element)) {
                    labelToElement[label.innerText.trim()] = element
                    consideredInputs = consideredInputs.filter(input => input != element)
                }
            } else {
                let element = $(label).find("input, textarea")[0]
                if (consideredInputs.includes(element)) {
                    labelToElement[label.innerText.trim()] = element
                    consideredInputs = consideredInputs.filter(input => input != element)
                }
            }
        });

        // console.log("labelToElement", labelToElement)
        // console.log("consideredInputs", consideredInputs)

        consideredInputs.forEach(input => {
            if (input.attributes.name) {
                labelToElement[input.attributes.name.value] = input
            } else if (label.attributes.id) {
                labelToElement[input.attributes.id.value] = input
            }
        });

        console.log("labelToElement", labelToElement)

        sendResponse(labelToElement);
        if (Object.keys(labelToElement).length) {
            alert("The FormFiller key is: " + msg.key)
        }
    } else if (msg.text === 'set') {
        let fields = msg.fields;
        let values = msg.values;
        fields.forEach((field, index) => {
            try {
                if(values[index]) {
                    labelToElement[field].value = values[index];
                }
            } catch {

            }
        });
    }
});