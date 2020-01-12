let key = Math.round(Math.random() * 1000000);
let timer = null;
let tab = null;

function fill(labelToElement) {
    var xhr = new XMLHttpRequest();
    var url = "https://oppo-fintech.herokuapp.com/getInput/" + key;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            chrome.tabs.sendMessage(tab.id, { text: 'set', fields: json.fields, values: json.values, labelToElement }, ()=>{})
            if (json.stop) {
                clearInterval(timer);
            }
        }
    };
    // var data = JSON.stringify({ key, structure: Object.keys(labelToElement) });
    xhr.send("");
}

function fillTheForm(labelToElement) {
    if (Object.keys(labelToElement).length) {
        var xhr = new XMLHttpRequest();
        var url = "https://oppo-fintech.herokuapp.com/pushfields";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                timer = setInterval(() => {
                    fill(labelToElement)
                }, 5000);
            }
        };
        var data = JSON.stringify({ key, fields: Object.keys(labelToElement) });
        xhr.send(data);
    }
}

chrome.browserAction.onClicked.addListener(function (t) {
    tab = t
    chrome.tabs.sendMessage(tab.id, { text: 'get', key }, fillTheForm);
});