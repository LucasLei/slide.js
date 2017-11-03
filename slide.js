// 实现效果要求：
// 切换按钮
// 切换效果，渐隐渐现
// 能不能自动播放

$.fn.extend({
    slide: function(choose) {
        // 初始化参数
        if (choose.btn === undefined) {
            choose.btn = true;
        }
        choose.effect = choose.effect || "fade";
        choose.autoPlay = choose.autoPlay || false;
        choose.playTime = choose.playTime || 3000;
        choose.dot = choose.dot || true;
        choose.dotColor = choose.dotColor || "#3963ec";
        if (choose.dot === undefined) {
            choose.dot = true;
        }



        // 初始化图片
        var imgList = this.find("img");
        var n = 0; //当前所在图片
        var length = imgList.length - 1;
        imgList.hide();
        imgList.eq(0).show();

        // 初始化页面 使图片居中
        this.css({
                "textAlign": "center",
                "cursor": "pointer",
                "position": "relative"
            })
            // 初始化按钮
        if (choose.btn) {
            var prev = $("<img src='img/g.png'>");
            var next = $("<img src='img/d.png'>");
            this.append(next);
            this.append(prev);
            next.css({
                position: "absolute",
                top: "45%",
                right: (this.width() - imgList.width()) / 2 + 20,
                transition: "all .5s",
                opacity: 0.7
            })
            prev.css({
                    position: "absolute",
                    top: "45%",
                    left: (this.width() - imgList.width()) / 2 + 20,
                    transition: "all .5s",
                    opacity: 0.7
                })
                // 鼠标移上效果
            next.mouseover(function() {
                $(this).css({
                    transform: "scale(1.2)",
                    opacity: 1
                })
            })
            prev.mouseover(function() {
                $(this).css({
                    transform: "scale(1.2)",
                    opacity: 1
                })
            })

            // 鼠标移下效果
            next.mouseout(function() {
                $(this).css({
                    transform: "scale(1)",
                    opacity: 0.7
                })
            })
            prev.mouseout(function() {
                $(this).css({
                    transform: "scale(1)",
                    opacity: 0.7
                })
            })

            // 绑定单击事件
            if (choose.effect == "fade") {
                //点击右边按钮
                next.click(function() {
                        right()
                        clearInterval(t);
                    })
                    //点击左边按钮
                prev.click(function() {
                    //清空所有li颜色
                    $("ul li").css({
                        backgroundColor: "#FFF"
                    })
                    if (n > 0) {
                        imgList.eq(n--).fadeOut(function() {
                            imgList.eq(n).fadeIn();
                            $("ul li").eq(n).css({
                                backgroundColor: "#3963ec"
                            })
                        })
                    } else {
                        imgList.eq(n).fadeOut(function() {
                            imgList.eq(length).fadeIn()
                            n = length;
                            $("ul li").eq(n).css({
                                backgroundColor: "#3963ec"
                            })
                        })
                    }
                    clearInterval(t);
                })

            }
        }
        //初始化小圆点
        if (choose.dot) {
            //初始化ul
            var ul = $("<ul></ul>");
            g = 0;
            ul.appendTo(this);
            for (var i = 0; i <= length; i++) {
                //初始化li
                var li = $("<li></li>");
                li.appendTo(ul);
                li.html(g++);
            }
            $("ul li").css({
                    listStyle: "none",
                    float: "left",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    marginLeft: "10px",
                    cursor: "pointer",
                    fontSize: "0px"
                })
                //第一个li添加颜色
            $("ul li").eq(0).css({
                    backgroundColor: "#3963ec"
                })
                //定位ul
            ul.css({
                position: "absolute",
                bottom: "20px"
            }).css({
                left: (this.width() - ul.width()) / 2
            })
        }
        //小圆点点击事件
        $("ul li").click(function() {
            //清除所有li颜色
            $("ul li").css({
                    backgroundColor: "#FFF"
                })
                //当前li添加颜色
            $(this).css({
                backgroundColor: "#3963ec"
            })
            n = $(this).html();
            //所有图片隐藏
            imgList.hide();
            //当前小圆点对应的图片显示
            imgList.eq(n).fadeIn();

        })

        // 下一张图方法
        function right() {
            if (n < length) {
                $("ul li").css({
                    backgroundColor: "#FFF"
                })
                imgList.eq(n++).fadeOut(function() {
                    imgList.eq(n).fadeIn()
                    $("ul li").eq(n).css({
                        backgroundColor: "#3963ec"
                    })
                })
            } else {
                // 去掉小圆点颜色
                $("ul li").css({
                        backgroundColor: "#FFF"
                    })
                    //图片隐藏显示
                imgList.eq(n).fadeOut(function() {
                    n = 0;
                    imgList.eq(n).fadeIn();
                    //添加小圆点颜色
                    $("ul li").eq(n).css({
                        backgroundColor: "#3963ec"
                    })
                })
            }
        }


        //自动播放图片
        var t = setInterval(function() {
            right();
        }, choose.playTime)
        imgList.mouseover(function() {
            clearInterval(t);
        })
        imgList.mouseout(function() {
            t = setInterval(function() {}, choose.playTime)
        })
    }
})


$(function() {
    $(".image").slide({
        btn: true,
        dotColor: "#3963ec"
    })
})
