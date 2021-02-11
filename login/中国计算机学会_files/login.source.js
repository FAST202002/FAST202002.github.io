!function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.login = factory());
}(this, function () {
    var loginTypeEnum = {
        account: 1,//账号登录
        phone: 2//手机登录
    };
    var loginCardEnum = {
        1: 'l-account',
        2: 'l-phone'
    };
    var login = {};
    var options = {
        loginType: loginTypeEnum.account,//展示卡片元素
        currentLoginTarget: loginCardEnum.account,
        referUrl: ''//请求来源
    };
    //初始化数据
    login.init = function (opt) {
        options = opt || {};
        if (options.loginType) {
            changeLoginTarget($("#" + (loginCardEnum[options.loginType] + "-target")));
        }
    }
    $("#login-account").click(function () {
        //账号登录
        loginAccount();
    });
    $("#login-phone").click(function () {
        //手机号登录
        loginPhone();
    })

    //账号密码登录
    function loginAccount() {
        var _userName = $.trim($("#user-name").val());
        var _pwd = $.trim($("#pass-word").val());
        if ((!_userName) || (!_pwd)) {
            $("#error-account").text("用户名/密码不能为空");
            return;
        }
        if (/[<>,+=^]/g.test(_userName)) {
            $("#error-account").text("用户名格式非法");
            return;
        }
        var $authCode = $("#form-account input[name='checkCode']");
        if ($authCode && $authCode.length > 0) {
            var authCode = $.trim($authCode.val());
            if (!authCode) {
                $("#error-account").text("验证码不能为空");
                return;
            }
            $authCode.val(authCode);
        }
        // $("#error-account").text("");
        // var $userName = $("#form-account input[name='username']");
        // var $pwd = $("#form-account input[name='password']");
        // $pwd.val(wzUtils.encrypt(_pwd));
        // $userName.val(_userName);
        // $("#form-account").submit();
    }

    //手机短信登录
    function loginPhone() {
        // TODO 校验
        var phone = $.trim($("input[name='phone']").val());
        if (!phone) {
            $("#error-phone").text("手机号不能为空");
            return;
        }
        if (!/^1\d{10}$/.test(phone)) {
            $("#error-phone").text("手机号格式非法");
            return;
        }
        $("input[name='phone']").val(phone);
        var $authCodePhone = $("input[name='smsCode']");
        var authCode = $.trim($authCodePhone.val());
        if (!authCode) {
            $("#error-phone").text("短信验证码不能为空");
            return;
        }
        // $authCodePhone.val(authCode);
        // $("#form-phone").submit();
    }

    // document.onkeydown = function (e) {//网页内按下回车触发
    //     switch ((window.event) ? event.keyCode : e.which) {
    //         case 13: {
    //             if (loginTypeEnum.phone == options.currentLoginTarget) {
    //                 loginPhone();
    //             } else {
    //                 loginAccount();
    //             }
    //             break;
    //         }
    //         default: {
    //         }
    //     }
    // };
    /*登录页切换*/
    $('.l_loginul li').click(function () {
        changeLoginTarget(this);
    });

    //切换登录方式
    function changeLoginTarget(ele) {
        var $me = $(ele);
        $me.addClass('active').siblings().removeClass('active');
        var target = $me.attr('card');
        //记录当前登录类型
        options.currentLoginTarget = target;
        if(options.currentLoginTarget == loginCardEnum["2"]){
            //刷新验证码
            changeImgCode('verify-' + target);
        }
        $('.l_logincard').hide();
        $('.' + target).show();
    }

    // //微信扫码登录
    // function wxQcCode(refererUrl) {
    //     var state = '';
    //     if (refererUrl) {
    //         refererUrl = $.base64.atob(refererUrl);
    //         state = encodeURIComponent(refererUrl);
    //     }
    //     var bastPath = config.getWebPath();
    //     new WxLogin({
    //         self_redirect: false,
    //         id: "login_qc_container",
    //         appid: "wx157bbca8ec8f4b2d",
    //         scope: "snsapi_login",
    //         redirect_uri: "https%3A%2F%2Fpassport.ccf.org.cn%2Fsso%2Fwechat%2Fuser_info_op", //登录成功，重定向地址授权地址
    //         state: state,
    //         style: "",
    //         href: bastPath + "/static/css/qrcode.css"//自定义样式
    //     });
    // }

    // /*扫码登录切换*/
    // $('.l_code').click(function () {
    //     if ($(this).hasClass('l_account')) {
    //         $(this).removeClass('l_account');
    //         $('.l_scancode').hide();
    //         $('.l_codetip').show();
    //         $('.l_loginul').show();
    //         $('.l_logincard').eq($('.l_loginul li.active').index()).show();
    //     } else {
    //         wxQcCode(options.referUrl);
    //         $(this).addClass('l_account');
    //         $('.l_codetip').hide();
    //         $('.l_loginul').hide();
    //         $('.l_logincard').hide();
    //         $('.l_scancode').show();
    //     }
    // })

    return login;
});
