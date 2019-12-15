async function fetchFieldsAndUpdate(){
    let response = await fetch("https://oppofintech.herokuapp.com/fields")
    fields = response.json()
    return fields
}

async function initiateFetchInterval(interval){
    let set_var = setInterval(async function(){
        let fields = await fetchFieldsAndUpdate()
        if(fields["Name"]){
            document.getElementById("Name").value = fields["Name"]
        }
        if(fields["Address"]){
            document.getElementById("Address").value = fields["Address"]
        }
        if(fields["Phone_Number"]){
            document.getElementById("Phone_Number").value = fields["Phone_Number"]
            clearInterval(set_var)
        }
        console.log("hello")
    }, interval)
}