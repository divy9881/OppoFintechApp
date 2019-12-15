async function fetchFieldsAndUpdate(){
    let response = await fetch("https://oppofintech.herokuapp.com/fields")
    fields = response.json()
    return fields
}

async function initiateFetchInterval(interval){
    setInterval(async function(){
        var fields = await fetchFieldsAndUpdate()
        console.log(fields)
    }, interval)
}