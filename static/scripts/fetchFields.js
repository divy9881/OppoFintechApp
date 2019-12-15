async function fetchFieldsAndUpdate(){
    let response = await fetch("https://oppofintech.herokuapp.com/fields")
    fields = response.json()
    console.log(fields)
    return "done"
}

async function initiateFetchInterval(interval){
    setInterval(async function(){
        var str = await fetchFieldsAndUpdate()
    }, interval)
}