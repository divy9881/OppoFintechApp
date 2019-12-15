async function fetchFieldsAndUpdate(){
    let response = await fetch("https://oppofintech.herokuapp.com/fields")
    fields = response.json()
    console.log("hello0")
    console.log(fields)
    return "done"
}

async function initiateFetchInterval(interval){
    console.log("hello1")
    setInterval(async function(){
        console.log("hello2")
        var str = await fetchFieldsAndUpdate()
        console.log(str)
        console.log("hello3")
    }, interval)
}