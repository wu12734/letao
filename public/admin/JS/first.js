$(function () {
    var page = 1;
    var pageSize = 5;

    //渲染页面
    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);

                $("tbody").html(template("tpl", info))

                //分页
                $('.pagination').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / pageSize),
                    onPageClicked: function (a, b, c, p) {
                        page = p;
                        render();
                    }
                })
            }
        })
    }

    //添加分类按钮
    $('.btn-add').click(function () {
        $('.first-modal').modal("show");
        page = 1;
    });
    //表单校验
    //使用表单校验插件
    $('#firstForm').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '分类名不能为空'
                    }
                }
            },
        }
    });
    $("#firstForm").on('success.form.bv', function (e) {
        e.preventDefault();
        console.log('hhe');

        //使用ajax提交逻辑
        $.ajax({
            type: "post",
            url: '/category/addTopCategory',
            data: $("#categoryName").serialize(),
            success: function (info) {
                if (info.success) {
                    $('.first-modal').modal("hide");
                    page = 1;
                    render();
                }
            }
        })

    });




})