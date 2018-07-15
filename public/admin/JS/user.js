$(function(){
    var page = 1;
    var pageSize = 5;

    //渲染页面
    render();

    function render(){
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(info){
                console.log(info);
                
                $("tbody").html(template("tpl", info))

                //分页
                $('.pagination').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPage: Math.ceil(info.total / pageSize),
                    onPageClicked: function (a,b,c,p){
                        p: page;
                        render();
                    }
                })
            }
        })
    }
    

    $("tbody").on("click", ".btn", function(){
        $('.user-modal').modal("show");
        var id = $(this).parent().data("id");
        var isDelete = $(this).hasClass('btn-danger')?0:1;
        $('.btn-yes').click(function(){
            $.ajax({
                type: "post",
                url: '/user/updateUser',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function(info){
                    if (info.success) {
                        $('.user-modal').modal("hide");
                        render();
                    }
                }
            })
        })
    })


})