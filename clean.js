function addJQueryScript() {
    var script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
    script.onload = script.onreadystatechange = function() {
        $(document).ready(() => {
            if(isLoginPage()) {
                cleanLoginPage()
            }
        });
    };
    document.body.appendChild(script);
}

let scriptAddInterval = setInterval(() => {
    if (document.readyState === "complete") {
        addJQueryScript();
        clearInterval(scriptAddInterval);
    }
});

function isLoginPage() {
    var login = $('div#pl_unlogin_home_login')
    if(login[0]) {
        return true;
    } else {
        return false;
    }
}

function cleanLoginPage() {
    // 移除顶部导航
    $('div.WB_global_nav.WB_global_nav_v2').remove()
    // 移除左边栏
    $('div.WB_main_l').remove()
    // 移除中间内容
    $('div.WB_frame_c').remove()
    // 移除登录框下面的内容
    $('div#pl_unlogin_home_hots').remove()
    $('div#pl_unlogin_home_hotpersoncategory').remove()
}
