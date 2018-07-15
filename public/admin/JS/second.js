$(function () {
    var page = 1;
    var pageSize = 5;

    //渲染页面
    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);

                $("tbody").html(template("tpl", info));

                //分页
                $('#paginator').bootstrapPaginator({
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
        $('.second-modal').modal("show");
        page = 1;

        //请求一级分类
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                console.log(info);
                $('.dropdown-menu').html(template('tpl1', info));
                $('.dropdown-menu').on('click', 'li a', function () {
                    $('#dLabel>span:first-child').text($(this).text());
                    $('.categoryId').val($(this).data('id'));
                    $('#secondForm').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
                })
            }
        })
    });
    //表单校验
    //使用表单校验插件
    $('#secondForm').bootstrapValidator({
        excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择一级分类名'
                    }
                }
            },
            //校验用户名，对应name表单的name属性
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入二级分类名'
                    }
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传品牌LOGO'
                    }
                }
            }

        }
    });

    $("#secondForm").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $('#secondForm').serialize(),
            success: function (info) {
                if (info.success) {
                    $('.second-modal').modal("hide");
                    page = 1;
                    render();

                    //3. 重置内容和样式
                    $("#secondForm")[0].reset();
                    $("#secondForm").data("bootstrapValidator").resetForm();

                    //4. 重置下拉框组件和图片
                    $("#dLabel>span:first-child").text("请选择一级分类");
                    $("[name='categoryId']").val('');
                    $(".form-img img").attr("src", "images/none.png");
                    $("[name='brandLogo']").val('');
                }

            }
        })
    });

    //图片上传
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data);
            $('.form-img img').attr('src', data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr);
            $('#secondForm').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });


})