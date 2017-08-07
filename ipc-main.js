const {ipcMain} = require('electron')
const {dialog} = require('electron')

ipcMain.on('ask-user',(event, arg) => {
    if(arg === true) {
        dialog.showMessageBox({
            type: "question",
            buttons: ["保存", "取消"],
            title: "保存微博内容",
            message: "点击确定开始保存内容",
            cancelId: 1
        }, function(index){
            if(index === 0) {
                event.returnValue = true
            } else {
                event.returnValue = false
            }
        })
    } else {
        event.returnValue = false
    }
})

ipcMain.on('save_reply', (event, arg) => {
    console.log('main'+arg)
})
