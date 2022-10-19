// preload.js

console.log(111)

// All the Node.js APIs are available in the preload process.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
    $("#webview").on("dom-ready", function(){
        $("#webview")[0].openDevTools()
    });
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})