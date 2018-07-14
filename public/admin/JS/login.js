$(function () {
    //使用表单校验插件
    $(".login").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: '用户名长度必须在3到6之间'
                    },
                    //回调 单独用
                    callback: {
                        message: "用户名错误"
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12之间'
                    },
                    //回调 单独用
                    callback: {
                        message: "密码错误"
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码由数字字母下划线和.组成'
                    }
                }
            }
        }

    });
    $("[type='reset']").click(function () {
        $("form").data("bootstrapValidator").resetForm(); //重置表单，并且会隐藏所有的错误提示和图标
    })
    $("[type=submit]").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $("form").serialize(),
            success: function (info) {
                if (info.success) {
                    location.href = "index.html";
                }
                if(info.error == 1000){
                    $("form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }
                if(info.error == 1001){
                    $("form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
                //error 1000 用户名错误  1001 密码错误
            }
        })
    })

})