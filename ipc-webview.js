const {ipcRenderer} = require('electron')
var default_page_detail_number = 45
var regex = /weibo\.com\/\w+\/profile.*is_all=1/g
global.observer = new MutationObserver(processLazyLoad)


ipcRenderer.on('save', (event, arg) => {
    // 添加 dom 事件监听
    addMutationObserver()

    var index = 1
    var number = getWeiboNumber()
    console.log(number)
    var totalPageNumber = getTotalPageNumber()
    console.log(totalPageNumber)
    if(totalPageNumber == 0) {
        ipcRenderer.sendToHost('error', 'get total page number error: 0')
    }
    if(index < totalPageNumber) {
        // 触发懒加载
        scrollToBottom()
    } else {

    }
})

function addMutationObserver() {
    var feedList = document.querySelector('#plc_main > div.WB_frame_c')
    var config = {childList: true, subtree: true}
    // 添加 DOM 事件监听
    global.observer.observe(feedList, config)
}

function getWeiboNumber() {
    return Number.parseInt(document.querySelector('#Pl_Core_T8CustomTriColumn__3 table.tb_counter tr td:nth-child(3) > a > strong').innerText)
}

function scrollToBottom(){
    window.scrollTo(0,document.body.scrollHeight)
}

function processLazyLoad(mutations){
    var isPersonMainPage = location.href.match(regex)
    if(!isPersonMainPage) {
        return
    }
    var lazyLoadTimes = 0
    var totalPageNumber = getTotalPageNumber()
    var currentPage = getCurrentPageNumber()
    var addNodes = []
    mutations.forEach(function(mutation){
        if(mutation.addedNodes.length > 30) {
            addNodes.push(mutation)
        }
    })
    // 有新增节点
    if(addNodes.length > 0) {
        var currentDetailItems = getWeiboDetailItems()
        // 非最后一页
        if(currentPage < totalPageNumber) {
            if(currentDetailItems.length == default_page_detail_number) {
                // 已全部加载
                var texts=[]
                currentDetailItems.forEach(function(item){
                    texts.push(item.outerHTML)
                })
                ipcRenderer.sendToHost('page', currentPage, texts)
            } else {
                // 继续出发懒加载
                scrollToBottom()
            }
        } else {

        }
    }
}

function getTotalPageNumber() {
    var totalPageNumber = getWeiboNumber()
    return totalPageNumber/default_page_detail_number + (totalPageNumber % default_page_detail_number === 0 ? 0 : 1)
}

function getCurrentPageNumber() {
    var search = location.search
    var regex= /page=(\d+)/g
    var match = regex.exec(search)
    if(match && match.length > 1) {
        return Number.parseInt(match[1])
    } else {
        return 1
    }
}

function getWeiboDetailItems() {
    var feedList = document.querySelector("div[node-type='feed_list']")
    return document.querySelectorAll("div[action-type='feed_list_item']")
}
