// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// ipc
const {ipcRenderer} = require('electron')
var flag=false

$(document).ready(function(){
    var webview = $('#webview')
    // 微博页面会自动做一次跳转，在 url 末尾添加 is_all=1
    var regex = /weibo\.com\/\w+\/profile.*is_all=1/g

    // 监听页面跳转事件
    webview.on("did-navigate-in-page", function(event){
        var url = event.originalEvent.url
        console.log(url)
        var isPersonMainPage = url.match(regex)
        if(isPersonMainPage) {
            var saveContent = ipcRenderer.sendSync('ask-user', true)
            if(saveContent) {
                webview[0].send('save', true)
            }
        }
    })

    webview.on('ipc-message', (event) => {
        var result = {}
        var channel = event.originalEvent.channel
        var page = event.originalEvent.args[0]
        var weibo = event.originalEvent.args[1]
        console.log(channel)
        console.log(page)
        console.log(weibo)
    })

    webview.on('console-message', (e) => {
        console.log('Guest page logged a message:', e.originalEvent.message)
    })

    webview.on('dom-ready', () => {
        webview[0].openDevTools()
    })
})

