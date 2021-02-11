// 刷新验证码
function changeImgCode(eleId) {
    var ele = document.getElementById(eleId);
    if (ele) {
        ele.src = config.getWebPath() + '/auth_code?v=' + (new Date()).getTime();
    }
}