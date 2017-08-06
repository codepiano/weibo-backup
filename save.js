$(document).ready(function(){
    var webview = $('#webview');
    webview.on("did-navigate", function(event){
        console.log(event.originalEvent.url)
    });
    webview.on("did-navigate-in-page", function(event){
        console.log(event.originalEvent.url)
    });
})
