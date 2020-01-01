function generateKey(interval){
    let key = ''
    key += String(Math.floor(Math.random()*10))
    key += String(Math.floor(Math.random()*10))
    key += String(Math.floor(Math.random()*10))
    key += String(Math.floor(Math.random()*10))
    let key_field = document.getElementById("key-field")
    key_field.innerText = "YOUR KEY IS " + key
    let form_element = document.querySelector("form")
    form_element.action = "/" + key
    initiateFetchInterval(interval, key)
}




