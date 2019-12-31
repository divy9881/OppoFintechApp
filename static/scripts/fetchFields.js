async function fetchFieldsAndUpdate(key){
    let response = await fetch("https://oppofintech.herokuapp.com/fields/"+key)
    fields = response.json()
    return fields
}
let set_var = undefined
async function initiateFetchInterval(interval, key){
    if(set_var!=undefined){
        clearInterval(set_var)
    }
    set_var = setInterval(async function(){
        let fields = await fetchFieldsAndUpdate(key)
        if(fields["Name"]){
            document.getElementById("Name").value = fields["Name"]
        }
        if(fields["Address"]){
            document.getElementById("Address").value = fields["Address"]
        }
        if(fields["Phone_Number"]){
            document.getElementById("Phone_Number").value = fields["Phone_Number"]
        }
        if(fields["Gender"]){
            document.getElementById(fields["Gender"]).checked = "checked"
        }
        if(fields["Gender"]){
            document.getElementById("Country").value = fields["Country"]
            clearInterval(set_var)
        }
    }, interval)
}