const {ipcRenderer} = require('electron')

// 是否在个人微博主页
ipcRenderer.on('save', (event, arg) => {
    ipcRenderer.sendToHost('number', getWeiboNumber())
})

function getWeiboNumber() {
    return document.querySelector('#Pl_Core_T8CustomTriColumn__3 table.tb_counter tr td:nth-child(3) > a > strong').innerText
}
