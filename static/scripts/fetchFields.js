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
        if(fields["Name"]){
            console.log(fields["Name"])
            console.log(fields["Name"])
            nameField.value = fields["Name"]
        }
        if(fields["Address"]){
            console.log(fields["Address"])
            addressField.value = fields["Address"]
        }
        if(fields["Phone_Number"]){
            console.log(fields["Phone_Number"])
            phone_NumberField.value = fields["Phone_Number"]
        }
    }, interval)
}