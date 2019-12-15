let nameField = document.getElementById("Name")
let addressField = document.getElementById("Address")
let phone_NumberField = document.getElementById("Phone_Number")


async function fetchFieldsAndUpdate(){
    let response = await fetch("https://oppofintech.herokuapp.com/fields")
    fields = response.json()
    return fields
}

async function initiateFetchInterval(interval){
    setInterval(async function(){
        let fields = await fetchFieldsAndUpdate()
        nameField.value = fields["Name"]
        addressField.value = fields["Address"]
        phone_NumberField.value = fields["Phone_Number"]
    }, interval)
}