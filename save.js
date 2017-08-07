// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// ipc
const {ipcRenderer} = require('electron')

$(document).ready(function(){
    var webview = $('#webview')
    // 微博页面会自动做一次跳转，在 url 末尾添加 is_all=1
    var regex = /weibo\.com\/\w+\/profile.*is_all=1/g

    // 监听页面跳转事件
    webview.on("did-navigate-in-page", function(event){
        var url = event.originalEvent.url
        var isPersonMainPage = url.match(regex)
        if(isPersonMainPage) {
            var saveContent = ipcRenderer.sendSync('ask-user', true)
            if(saveContent) {
                webview[0].send('save', true)
            }
        }
    })

    webview.on('ipc-message', (event) => {
        var number = event.originalEvent.args[0]
        console.log(number)
    })
})

