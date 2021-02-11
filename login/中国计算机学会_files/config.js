/**
 * Created by wz
 * 配置类
 */
!function (global, fun) {
    "function" == typeof define && define.amd ? define(fun) : global.config = fun()
}(this, function () {
    var config = {
        contextPath: "/sso",
        getWebPath: function () {
            var protocol = window.location.protocol; //获取协议
            var host = window.location.host; //获取服务器名称和端口号（如果有）
            var webPath = protocol + "//" + host + this.contextPath;
            return webPath;
        }
    }
    return config;
});
